import { Component, OnInit} from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import * as d3 from 'd3';

@Component({
  selector: 'app-ads-related-data',
  templateUrl: './ads-related-data.component.html',
  styleUrls: ['./ads-related-data.component.less']
})

export class AdsRelatedDataComponent implements OnInit {
  appNames: string[] = [];
  adNames: string[] = [];
  appsByCategory: { inactive: any[], active: any[], removed: any[] } = { inactive: [], active: [], removed: [] };
  apptype: { PAGE_VIEW: any[], VIEW_CONTENT: any[] } = { PAGE_VIEW: [], VIEW_CONTENT: [] };
  totalCount = 0;
  public hasFacebookActivity = false;
  public hasWebsiteInteractions = false;
  constructor(private dbService: NgxIndexedDBService) { }
  ngOnInit(): void {
    this.getData();
    this.generateBubbleChart();
  }

  /**
  * This method is responsible to show the stored data from  the Indexed DB to the browser.
  *
  * for example  "face/ads_interacted" shows the total number of ads clicked and  the corresponding ad names
  * 
  * and "face/apps_websites" shows the website interactions whether the website is active, inactive or removed.
  *
  * @author: Rishma (rishmamn@mail.uni-paderborn.de))
  *
  */
  async getData() {
    this.dbService.getAll('face/ads_interacted').subscribe((ads_interacted_with: any) => {
      for (let i = 0; i < ads_interacted_with.length; i++) {
        const name = ads_interacted_with[i].title;
        this.adNames.push(name);

        if (ads_interacted_with[i].action === 'Clicked ad') {
          this.totalCount++;
        }
      }
    });
    this.dbService.getAll('face/apps_websites').subscribe((apps_websites: any) => {
      if (apps_websites.length !== 0) {
        for (let app of apps_websites) {
          if (app.category === 'inactive') {
            //display unique apps checking the category and name
            if (!this.appsByCategory.inactive.includes(app.name)) {
              this.appsByCategory.inactive.push(app.name);
            }
          } else if (app.category === 'active') {
            if (!this.appsByCategory.active.includes(app.name)) {
              this.appsByCategory.active.push(app.name);
            }
          } else if (app.category === 'removed') {
            if (!this.appsByCategory.removed.includes(app.name)) {
              this.appsByCategory.removed.push(app.name);
            }
          }
        }
      }
    });
  }

  /**
  * This method is responsible to show the bubble chart for the off-facebook activity depending 
  * 
  *  on the interactions with the most viewed applications. 
  *
  * @author: Rishma (rishmamn@mail.uni-paderborn.de))
  *
  */

    generateBubbleChart(){
    this.dbService.getAll('face/off_facebook_activity').subscribe((apps: any) => {
      if (apps.length != 0) {
        const appCounts: { [key: string]: { [key: string]: number } } = {};
        for (let i = 0; i < apps.length; i++) {
          const app = apps[i];
          const appName = app.name;
          const events = app.events;

          // Check if the app has the types PAGE_VIEW or VIEW_CONTENT
          for (let j = 0; j < events.length; j++) {
            const eventType = events[j].type;
            if (eventType === 'PAGE_VIEW' || eventType === 'VIEW_CONTENT') {
              // Initialize the app count if it doesn't exist
              if (!appCounts[appName]) {
                appCounts[appName] = {
                  PAGE_VIEW: 0,
                  VIEW_CONTENT: 0
                };
              }

              // Increment the app count for the event type
              appCounts[appName][eventType] += 1;
            }
          }
        }

        // Convert the appCounts object into an array of objects and sort by total count
        const appCountsArray = Object.entries(appCounts).map(([appName, counts]) => ({
          appName,
          pageViews: counts['PAGE_VIEW'],
          viewContent: counts['VIEW_CONTENT'],
          totalCount: counts['PAGE_VIEW'] + counts['VIEW_CONTENT']
        })).sort((a, b) => b.totalCount - a.totalCount);

        // Sort appCountsArray by count in descending order
        const topApps = appCountsArray.slice(0, 10);

        // Set up the dimensions and margins for the chart
        const margin = { top: 80, right: 170, bottom: 150, left: 130 };
        const width = 1200 - margin.left - margin.right;
        const height = 1000 - margin.top - margin.bottom;

        const svg = d3.select('#bubble-chart').append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // The minimum and maximum values in the totalCount data 
        //are mapped to the minimum and maximum bubble sizes respectively
        const sizeScale = d3.scaleLinear()
          .domain(d3.extent(topApps.map(d => d.totalCount)) as unknown as number[])
          .range([10, 50]);

        // Set up the color scale for the bubbles
        const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

        const xScale = d3.scaleBand()
          .range([0, width])
          .padding(0.2);

        const yScale = d3.scaleLinear()
          .range([height, 0]);

        const xAxis = d3.axisBottom(xScale)
          .tickFormat(d => d)
          .tickSize(0)
          .tickPadding(10);

        const yAxis = d3.axisLeft(yScale)
          .ticks(5);

        xScale.domain(topApps.map(d => d.appName));
        yScale.domain([0, d3.max(topApps, d => d.totalCount) as number]);

        // Add Y-axis label
        svg.append("text")
          .attr('class', 'axis-label arrow')
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left)
          .attr("x", 0 - (height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text("No of times viewed");

        svg.append('g')
          .attr('transform', `translate(0, ${height})`)
          .call(xAxis)
          .selectAll('text')
          .attr('y', 10)
          .attr('x', -5)
          .attr('transform', 'rotate(-45)')
          .style('text-anchor', 'end')
          .style('font-weight', 'bold');

        // Add X-axis label
        svg.append("text")
          .attr("class", "x-axis-label")
          .attr("transform", `translate(${width / 2},${height + margin.top + 50})`)
          .style("text-anchor", "middle")
          .text("Applications");


        svg.append('g')
          .call(yAxis);

        svg.selectAll('circle')
          .data(topApps)
          .enter()
          .append('circle')
          .attr('cx', d => xScale(d.appName)! + xScale.bandwidth() / 2)
          .attr('cy', d => yScale(d.totalCount))
          .attr('r', d => sizeScale(d.totalCount))
          .attr("fill", d => colorScale(d.appName))

          //show total Count when hovered
          
          .on("mouseover", function (event, d) {
            d3.select(this)
              .transition()
              .duration(200)
              .attr("r", sizeScale(d.totalCount) * 1.2)
              .style("cursor", "pointer");
            svg.append("text")
              .attr("id", "count-label")
              .attr("x", d3.select(this).attr("cx"))
              .attr("y", d3.select(this).attr("cy"))
              .attr("text-anchor", "middle")
              .text(d.totalCount)
              .style("font-size", "1.5em");
          })
          .on("mouseout", function (event, d) {
            d3.select(this)
              .transition()
              .duration(200)
              .attr("r", sizeScale(d.totalCount));
            d3.select("#count-label").remove();
          });
     
    }
    });
  }
}