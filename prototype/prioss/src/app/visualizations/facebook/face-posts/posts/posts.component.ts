import { Component, Input } from '@angular/core';
import d3 from 'd3';
import { FacebookPostsRepository } from 'src/app/db/data-repositories/facebook/fb-posts/face-posts.repo';
import { PostsModel } from 'src/app/models/Facebook/posts';

export class PostDataModel {
  year: number;
  time: string;
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.less']
})
export class PostsComponent {

  posts: PostsModel[] = [];

  dataset: PostDataModel[] = [];

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

  createData()
  {
    const years: number[] = [];
    const time: number[] = [];

    this.dataset = this.posts.map((d) => {
      const date = new Date(d.timestamp * 1000); // Convert Unix timestamp to milliseconds
      const year = date.getFullYear();
      const time = `${date.getHours()}`;
      return { year: year, time: time };
    });

    console.log(this.dataset);
  }

//   makeChart() {
//     // Define the dimensions and margins of the graph
//     const margin = { top: 40, right: 20, bottom: 30, left: 0 };
//     const width = 650 - margin.left - margin.right;
//     const height = 500 - margin.top - margin.bottom;

//     const svg = d3.select("#post-chart")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom);

//     // Create scales for x and y axes
//     const xScale = d3.scaleLinear().range([0, width]);
//     const yScale = d3.scaleTime().range([height, 0]);

//     svg.append("g")
//     .attr("transform", `translate(${margin.left}, ${margin.top})`)
//     .selectAll("circle")
//     .data(this.dataset)
//     .enter()
//     .append("circle")
//     .attr("cx", (d) => xScale(d.year))
//     .attr("cy", (d) => yScale(new Date(`2000-01-01T${d.time}`)))
//     .attr("r", 4)
//     .style("fill", "steelblue");

//     // Add x-axis
//     svg.append("g")
//     .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
//     .call(d3.axisBottom(xScale));

//    // Add y-axis
// svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`)
//   .call(d3.axisLeft(yScale).tickFormat(d3.timeFormat("%H:%M:%S")));

}
