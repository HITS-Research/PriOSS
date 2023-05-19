import { Component, Input, OnInit} from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import * as d3 from 'd3';
import { Router } from '@angular/router';

  @Component({
    selector: 'app-ads-related-data',
    templateUrl: './ads-related-data.component.html',
    styleUrls: ['./ads-related-data.component.less']
  })

  export class AdsRelatedDataComponent implements OnInit {
    @Input()
    previewMode: boolean = false;
    appNames: string[] = [];
    adNames: string[] = [];
    appsByCategory: { inactive: any[], active: any[], removed: any[] } = { inactive: [], active: [], removed: [] };
    apptype: { PAGE_VIEW: any[], VIEW_CONTENT: any[] } = { PAGE_VIEW: [], VIEW_CONTENT: [] };
    totalCount = 0;
    activeWebsite = 0;
    inActiveWebsite = 0;
    removedWebsite = 0;
    constructor(private dbService: NgxIndexedDBService, private router: Router) { }
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
          const encodedName = encodeURIComponent(name);
          const decodedName = decodeURIComponent(encodedName);
          this.adNames.push(decodedName);
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
                this.inActiveWebsite++;
              }
            } else if (app.category === 'active') {
              if (!this.appsByCategory.active.includes(app.name)) {
                this.appsByCategory.active.push(app.name);
                this.activeWebsite++;
              }
            } else if (app.category === 'removed') {
              if (!this.appsByCategory.removed.includes(app.name)) {
                this.appsByCategory.removed.push(app.name);
                this.removedWebsite++;
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
      const topApps = appCountsArray.slice(0, 20);

    // Remove old bubble chart
    d3.select("#bubble-chart").selectAll("*").remove();
    let margin = 10;
    let leftmargin = 330;
    let rightMargin = 80; // Adjust the right margin value
    let bottomMargin = 125;
    let xAxisWidth = window.innerWidth - leftmargin - rightMargin;
    let yAxisHeight = window.innerHeight - margin - bottomMargin;

    let svg = d3
      .select("#bubble-chart")
      .append("svg")
      .attr("viewBox", `0 0 ${xAxisWidth + leftmargin + rightMargin} ${yAxisHeight + margin + bottomMargin}`)
      .append("g")
      .attr("transform", "translate(" + leftmargin + "," + margin + ")");

    svg.append("text")
      .attr("x", xAxisWidth / 2)
      .attr("y", margin - 50)
      .attr("text-anchor", "middle")
      .style("font-size", "35px")
      .style("font-weight","bold")
      .text("Top 20 Interacted Applications");
    // The minimum and maximum values in the totalCount data 
    // are mapped to the minimum and maximum bubble sizes respectively
    const sizeScale = d3.scaleLinear()
    .domain(d3.extent(topApps.map(d => d.totalCount)) as unknown as number[])
      .range([10, 50]);

    // Set up the color scale for the bubbles
    const colorScale = d3.scaleSequential()
    .interpolator(d3.interpolateBlues)
      .domain([topApps.length, 0]);

      const yScale = d3.scalePoint()
  .range([0, yAxisHeight])
  .padding(1.1)
  .domain(topApps.map(d => d.appName));


      const yAxis = d3.axisLeft(yScale)
      .tickFormat(d => d)
      .ticks(topApps.length) // Adjust the number of ticks to match the number of labels
      .tickSize(20);

    yScale.domain(topApps.map(d => d.appName));

    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -(leftmargin - 5))
    .attr("x", 0 - (yAxisHeight / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("font-size", "24px")
    .text("Applications interacted by users");

    svg.append("g")
    .attr("class", "y-axis")
    .call(yAxis)
    .selectAll("text")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .attr("dy", "0.5em"); 

    // add X-axis details
    const xScale = d3.scaleLinear()
    .range([0, xAxisWidth]);

    xScale.domain([0, d3.max(topApps, d => d.totalCount) as number]);

    const xAxis = d3.axisBottom(xScale)
    .ticks(10)
    .tickSize(10)
    .tickPadding(10);

    // Add X-axis label
    svg.append("text")
    .attr("class", "axis-label")
    .attr("transform", `translate(${xAxisWidth / 2},${yAxisHeight + margin + 90})`)
    .style("text-anchor", "middle")
    .style("font-size", "24px")
    .text("No of times the applications has been interacted by users");

    svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${yAxisHeight})`)
    .call(xAxis)
    .selectAll("text")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .style("text-anchor", "end");

    svg.selectAll("circle")
    .data(topApps)
    .enter()
    .append("circle")
    .attr("cy", d => yScale(d.appName) as number)
    .attr("cx", d => xScale(d.totalCount) as number)
    .attr("r", d => sizeScale(d.totalCount))
    .attr("fill", (d, i) => colorScale(i))

     //Select all the circles in the bubble chart
   .on("mouseover", function (event, d) {
    d3.select(this)
      .transition()
      .duration(200)
      .attr("r", sizeScale(d.totalCount) * 1.2)
      .style("cursor", "pointer");
 
    svg.append("text")
      .attr("id", "app-label")
      .attr("x", d3.select(this).attr("cx"))
      .attr("y", parseInt(d3.select(this).attr("cy")) - 20)
      .attr("text-anchor", "middle")
      .text(d.appName)
      .style("font-size", "1.7em")
      .style("fill", "orange");     //Add fill color to orange

    svg.append("text")
      .attr("id", "count-label")
      .attr("x", d3.select(this).attr("cx"))
      .attr("y", d3.select(this).attr("cy"))
      .attr("text-anchor", "middle")
      .text(d.totalCount)
      .style("font-size", "1.7em")
      .style("fill", "orange");     //Add fill color to orange
  })
  .on("mouseout", function (event, d) {
    d3.select(this)
      .transition()
      .duration(200)
      .attr("r", sizeScale(d.totalCount));
 
    d3.select("#app-label").remove();
    d3.select("#count-label").remove();
  });


      }
      });
    } 

      /**
  * This method is responsible to navigate to off-facebook activity guidelines  
  *
  * @author: Mukul (mukuls@mail.uni-paderborn.de)
  *
  */
  navigateToRectification(){
    this.router.navigate(['face/configure-off-facebook-activity']);
  }
}
