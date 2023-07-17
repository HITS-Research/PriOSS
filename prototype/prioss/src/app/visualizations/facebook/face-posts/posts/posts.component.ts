import { Component, Input } from '@angular/core';
import * as d3 from 'd3';
import { FacebookPostsRepository } from 'src/app/db/data-repositories/facebook/fb-posts/face-posts.repo';
import { PostsModel } from 'src/app/models/Facebook/posts';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.less']
})
export class PostsComponent {

  posts: PostsModel[] = [];

  @Input()
  previewMode: boolean = false;

  constructor(
    private facePostsRepo: FacebookPostsRepository
  ) {}

  ngOnInit() {
    this.facePostsRepo.getAllPosts().then(posts => {
        this.posts = posts;
        this.createData();
      })
  }

  /**
  * This methods converts the timestamp into date
  * 
  *
  * @author: rbharmal@mail.upb.de
  *
  */
  getTimestamp(timestamp: number) {
      const date = new Date(timestamp*1000);
      return date.toDateString();
  }


  /**
  * This methods converts the data for posts into year and post count
  * 
  *
  * @author: rbharmal@mail.upb.de
  *
  */
  createData()
  {
    var data:any[] = [];
    var years: number[] = [];
    var postCount: number[] = [];
    this.posts.forEach(x =>
      {
        const year = new Date(x.timestamp*1000).getFullYear();
        if(years.indexOf(year) === -1){
          years.push(year);
        }  
      });
      years.sort();
    years.forEach(year => {
      const postCount = this.posts.filter(a => new Date(a.timestamp*1000).getFullYear() === year);
      var abc = {year: year, count: postCount.length};
      data.push(abc);
    });
    this.makeChart(data);
  }


  /**
  * This methods generates the barchart for the post data
  * @param data is the array of post data 
  *
  * @author: rbharmal@mail.upb.de
  *
  */
  makeChart(data: any[]) {
    // // Define the dimensions and margins of the graph
    // const margin = { top: 40, right: 20, bottom: 30, left: 0 };
    // const width = 650 - margin.left - margin.right;
    // const height = 500 - margin.top - margin.bottom;

    // const svg = d3.select("#post-chart")
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom);

    // // Create scales for x and y axes
    // const xScale = d3.scaleLinear().range([0, width]);
    // const yScale = d3.scaleTime().range([height, 0]);

    // svg.append("g")
    // .attr("transform", `translate(${margin.left}, ${margin.top})`)
    // .selectAll("circle")
    // .data(this.dataset)
    // .enter()
    // .append("circle")
    // .attr("cx", (d) => xScale(d.year))
    // .attr("cy", (d) => yScale(new Date(`2000-01-01T${d.time}`)))
    // .attr("r", 4)
    // .style("fill", "steelblue");

    // // Add x-axis
    // svg.append("g")
    // .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
    // .call(d3.axisBottom(xScale));

    // // Add y-axis
    // svg.append("g")
    // .attr("transform", `translate(${margin.left}, ${margin.top})`)
    // .call(d3.axisLeft(yScale).tickFormat((d) => d3.timeFormat("%H:%M:%S")(d as Date)));

    // // Add x-axis label
    // svg.append("text")
    // .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
    // .style("text-anchor", "middle")
    // .text("Year");

    // // Add y-axis label
    // svg.append("text")
    // .attr("transform", "rotate(-90)")
    // .attr("y", margin.left - 5)
    // .attr("x", -(height / 2))
    // .style("text-anchor", "middle")
    // .text("Time");

    //show an empty chart if the given data is null
    if (data == null) {
      data = [];
    }

    const margin = { top: 40, right: 20, bottom: 30, left: 0 };
    const width = 1000 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    // Get svg based on the id to draw chart
    const svg = d3.select("#post-chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const x = d3.scaleBand()
      .domain(data.map(d => d.year.toString()))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)] as number[])
      .range([height, 0]);

    const tooltip = svg.append("text")
      .attr("class", "tooltip")
      .attr("x", 0)
      .attr("y", 0)
      .style("color", "white")
      .style("opacity", 0);

    // Fill the chart with data values
    svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .selectAll("rect")
      .data(data)
      .join("rect")
        .attr("x", d => x(d.year.toString())!)
        .attr("y", d => y(d.count))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.count))
        .attr("fill", "#3B5998")
        // Show tooltip on mouseover
        .on("mouseover", function(event, d) {
          const barX = x(d.year.toString())! + x.bandwidth() / 2;
          const barY = y(d.count);
          tooltip.text(d.count)
            .attr("x", barX - 19)
            .attr("y", barY + 20)
            .style("opacity", 1)
            .style("font-size", "24px");
        })
        // Change position of tooltip on mouse move
        .on("mousemove", function (event) {
          tooltip
            .style("top", (event.pageY - 10) + "px")
            .style("left", (event.pageX + 10) + "px");
        })
        // Hide tooltip on mouse out
        .on("mouseout", function(event, d) {
          tooltip.style("opacity", 0);
        });
  

    svg.append("g")
      .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
      .style("font-size", "20px")
      .call(d3.axisBottom(x));
    
    svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .style("font-size", "20px")
      .call(d3.axisLeft(y).ticks(10));

    // Add x-axis label
    svg.append("text")
      .attr("transform", `translate(${margin.left + width / 2}, ${height + margin.top + 55})`)
      .style("text-anchor", "middle")
      .style("font-size", "20px")
      .text("Year");
    
    // Add y-axis label
    svg.append("text")
      .attr("transform", `rotate(-90) translate(${-margin.top - height / 2}, ${margin.left - 40})`)
      .style("text-anchor", "middle")
      .style("font-size", "26px")
      .text("Post count over the years");

  }
}
