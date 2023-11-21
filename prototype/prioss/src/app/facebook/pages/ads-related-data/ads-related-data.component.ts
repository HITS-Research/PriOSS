import { ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import * as d3 from 'd3';
import { Router } from '@angular/router';
import { FacebookAdsInteractedRepository } from 'src/app/db/data-repositories/facebook/fb-ads-data/face-ads-interacted.repo';
import { AdsInteractedModel } from "src/app/facebook/models/adsInteracted";
import { FacebookAppsWebsitesRepository } from 'src/app/db/data-repositories/facebook/fb-ads-data/face-apps-websites.repo';
import { AppsAndWebsitesModel } from 'src/app/facebook/models/appsAndWebsites';
import { FacebookOffFacebookActivityRepository } from 'src/app/db/data-repositories/facebook/fb-ads-data/face-off-facebook-activity.repo';
import { OffFacebookActivityModel } from 'src/app/facebook/models/offfacebookactivity';
  @Component({
    selector: 'app-ads-related-data',
    templateUrl: './ads-related-data.component.html',
    styleUrls: ['./ads-related-data.component.less']
  })

  export class AdsRelatedDataComponent implements OnInit {

    @Input()
    previewMode = false;
    appNames: string[] = [];
    adNames: string[] = [];
    appsByCategory: { inactive: any[], active: any[], removed: any[] } = { inactive: [], active: [], removed: [] };
    apptype: { PAGE_VIEW: any[], VIEW_CONTENT: any[] ,INITIATE_CHECKOUT: any[]} = { PAGE_VIEW: [], VIEW_CONTENT: [], INITIATE_CHECKOUT: [] };
    totalCount = 0;
    totalCountClickedAds = 0;
    totalAdsCount = 0;
    activeWebsite = 0;
    inActiveWebsite = 0;
    removedWebsite = 0;
    defaultTabIndex = 0;
    pageViewViewContentCount = 0;
    initiateCheckoutCount = 0;
    totalWebsites = 0;
    totalOffsiteInteractions = 0;
    totalOffsiteCheckoutActivities =0;
    adsInteracted: AdsInteractedModel[] = [];
    apps_websites: AppsAndWebsitesModel[] = [];
    activeTab = 0;
    off_facebook_activity: OffFacebookActivityModel[] = [];
    dataAvailable = false;
    dataAvailableAdNames = false;
    dataAvailableAWebsiteNames =  false;
    constructor(private router: Router,private faceAdsInteractedRepo: FacebookAdsInteractedRepository,private faceAppsAndWebsitesRepo: FacebookAppsWebsitesRepository,
      private faceOffFacebookActivityRepo: FacebookOffFacebookActivityRepository,private cdr: ChangeDetectorRef) { }
      ngOnInit(): void {
        this.loadTabContent();
        this.getData();
      }
       /**
      * This method is responsible toload the respective tabs.
      * @author: Rishma (rishmamn@mail.uni-paderborn.de))
      *
      */
       async loadTabContent() {
        await this.activateTab(0);
        await this.activateTab(1);
      }

     /**
      * This method is responsible to activate the respective link based on clicked events.
      * @author: Rishma (rishmamn@mail.uni-paderborn.de))
      *
      */
    activateTab(tabIndex: number) {
      this.activeTab = tabIndex;
      if (tabIndex === 0) {
        const types = ['PAGE_VIEW', 'VIEW_CONTENT'];
        const chartId = 'bubble-chart-interactions';
        const yAxisLabel = 'Businesses or Organizations';
        const xAxisLabel = 'Number of Interactions';
        const title = 'Top 20 Interacted Applications';
       this.generateBubbleChart(types, chartId, xAxisLabel, yAxisLabel, title,0);
      }else if (tabIndex === 1) {
      const types = ['INITIATE_CHECKOUT'];
      const chartId = 'bubble-chart-purchase-tracking';
      const yAxisLabel = 'Businesses or Organizations';
      const xAxisLabel = 'Number of Checkout Events';
      const title = 'Top Apps with Most Checkout Events';
      this.generateBubbleChart(types, chartId, xAxisLabel, yAxisLabel, title,1);
      }
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
      this.faceAdsInteractedRepo.getAllFaceAdsInteracted().then((ads_interacted_with) => {
        this.adsInteracted = ads_interacted_with;
        this.dataAvailableAdNames =  this.adsInteracted.length !== 0;
        for (let i = 0; i < this.adsInteracted.length; i++) {
          const name = this.adsInteracted[i].title;
          this.adNames.push(name);

          if (this.adsInteracted[i].action === 'Clicked ad') {
            this.totalCountClickedAds++;
          }
        }
      });
      this.faceAppsAndWebsitesRepo.getAllFaceAppsAndWebsites().then((apps_websites) => {
        this.apps_websites = apps_websites;
        this.dataAvailableAWebsiteNames =  this.apps_websites.length !== 0;
        const uniqueAppNames = new Set();

        for (const app of apps_websites) {
            const category = app.category;
            const appName = app.name;

            if (category === 'inactive') {
                if (!uniqueAppNames.has(appName)) {
                    this.appsByCategory.inactive.push(appName);
                    uniqueAppNames.add(appName);
                    this.inActiveWebsite++;
                }
            } else if (category === 'active') {
                if (!uniqueAppNames.has(appName)) {
                    this.appsByCategory.active.push(appName);
                    uniqueAppNames.add(appName);
                    this.activeWebsite++;
                }
            } else if (category === 'removed') {
                if (!uniqueAppNames.has(appName)) {
                    this.appsByCategory.removed.push(appName);
                    uniqueAppNames.add(appName);
                    this.removedWebsite++;
                }
            }
        }

        this.totalWebsites = this.inActiveWebsite + this.activeWebsite + this.removedWebsite;
    });

    }

    /**
    * This method is responsible to show the bubble chart for the off-facebook activity depending
    *
    *  on the interactions with the most viewed applications.
    *
    * @author: Rishma (rishmamn@mail.uni-paderborn.de)
    *
    */
    generateBubbleChart(types: string[], chartId: string, xAxisLabel: string, yAxisLabel: string, title: string,selectedTab : number): void {
      //reset the count when tab is clicked
      if (selectedTab === 0) {
        this.totalOffsiteInteractions = 0;
      } else if (selectedTab === 1) {
        this.totalOffsiteCheckoutActivities = 0;
      }
      this.faceOffFacebookActivityRepo.getAllOffFacebookActivity().then((apps) => {
        this.off_facebook_activity = apps;
        this.dataAvailable = this.off_facebook_activity.length !== 0;
        this.cdr.detectChanges();
        if (this.off_facebook_activity.length !== 0) {
          const appCounts: { [key: string]: { [key: string]: number } } = {};
          for (let i = 0; i < this.off_facebook_activity.length; i++) {
            const app = this.off_facebook_activity[i];
            const appName = app.name;
            const events = app.events;
            const eventType = app.type;

            if (types.includes(eventType)) {
              // Initialize the app count if it doesn't exist
              if (!appCounts[appName]) {
                appCounts[appName] = {
                  PAGE_VIEW: 0,
                  VIEW_CONTENT: 0,
                  INITIATE_CHECKOUT: 0
                };
              }

              for (let j = 0; j < events.length; j++) {
                if ((selectedTab === 0) && (eventType === 'PAGE_VIEW' || eventType === 'VIEW_CONTENT')) {
                  appCounts[appName][eventType] += 1;
                  this.totalOffsiteInteractions += 1; // Increment the total offsite interactions count
                } else if ((selectedTab === 1) && eventType === 'INITIATE_CHECKOUT') {
                  appCounts[appName][eventType] += 1;
                  this.totalOffsiteCheckoutActivities += 1;
                  // Increment the total offsite checkout activities count
                }
              }
            }
          }
            // Convert the appCounts object into an array of objects and calculate total counts
             const appCountsArray = Object.entries(appCounts).map(([appName, counts]) => {
              const pageViewViewContentCount = counts['PAGE_VIEW'] + counts['VIEW_CONTENT'];
              const initiateCheckoutCount = counts['INITIATE_CHECKOUT'];
              const totalCount = selectedTab === 0 ? pageViewViewContentCount : initiateCheckoutCount;

              return {
                appName,
                pageViewViewContentCount,
                initiateCheckoutCount,
                totalCount
              };
            }).sort((a, b) => b.totalCount - a.totalCount);

            const topApps = appCountsArray.slice(0, 20);


    // Remove old bubble chart
    const margin = 10;
    const leftmargin = 330;
    const rightMargin = 80; // Adjust the right margin value
    const bottomMargin = 125;
    const xAxisWidth = window.innerWidth - leftmargin - rightMargin;
    const yAxisHeight = window.innerHeight - margin - bottomMargin;

    const svg = d3
      .select(`#${chartId}`)
      .append("svg")
      .attr("viewBox", `0 0 ${xAxisWidth + leftmargin + rightMargin} ${yAxisHeight + margin + bottomMargin}`)
      .append("g")
      .attr("transform", "translate(" + leftmargin + "," + margin + ")");

    svg.append("text")
      .attr("x", xAxisWidth / 2)
      .attr("y", margin - 10)
      .attr("text-anchor", "middle")
      .style("font-size", "35px")
      .style("font-weight","bold")
      .text(title);
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
    .text(yAxisLabel);

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
    .text(xAxisLabel);

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

   /**
  * This method is responsible to navigate to guidelines to hide ads
  *
  * @author: Mukul (mukuls@mail.uni-paderborn.de)
  *
  */
   navigateToAdsSettings(){
    this.router.navigate(['face/guidelines-for-ads-settings']);
  }

/**
  * This method is responsible to navigate to apps and websites page.
  *
  * @author: Rishma (rishmamn@mail.uni-paderborn.de)
  *
  */
  redirectToFacebookSettings() {
    window.open('https://www.facebook.com/settings?tab=applications', '_blank');
  }
}
