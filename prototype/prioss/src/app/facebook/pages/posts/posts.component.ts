/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, Input, OnInit ,ChangeDetectionStrategy} from '@angular/core';
import * as d3 from 'd3';
import { FacebookPostsRepository } from 'src/app/db/data-repositories/facebook/fb-posts/face-posts.repo';
import { PostsModel } from 'src/app/facebook/models/posts';
import { scrollToTop } from 'src/app/features/utils/generalUtilities.functions';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit {
  posts: PostsModel[] = [];
  maximumPost: any[] = [];
  minimumPost: any[] = [];
  monthView: boolean;
  selectedYear: number;
  postDataMonths: any[] = [];
  isShowPostList = false;
  selectedMonth: string;
  postDataFilter: any[] = [];

  @Input()
  previewMode = false;

  constructor(private facePostsRepo: FacebookPostsRepository) {}

  ngOnInit() {
    scrollToTop();
    this.facePostsRepo.getAllPosts().then((posts) => {
      this.posts = posts;
      this.createYearData();
    });
  }

  /**
   * This methods converts the timestamp into date
   *
   *
   * @author: rbharmal@mail.upb.de
   *
   */
  getTimestamp(timestamp: number) {
    const date = new Date(timestamp * 1000);
    return date.toDateString();
  }

  /**
   * This methods converts the data for posts into year and post count
   *
   *
   * @author: rbharmal@mail.upb.de
   *
   */
  createYearData() {
    const data: any[] = [];
    const years: number[] = [];
    this.posts.forEach((x) => {
      const year = new Date(x.timestamp * 1000).getFullYear();
      if (years.indexOf(year) === -1) {
        years.push(year);
      }
    });
    years.sort();
    years.forEach((year) => {
      const postCount = this.posts.filter(
        (a) => new Date(a.timestamp * 1000).getFullYear() === year,
      );
      const abc = { year: year, count: postCount.length };
      data.push(abc);
    });

    let maxCount = -Infinity;
    let minCount = Infinity;

    data.forEach((item) => {
      const count = item.count;

      if (count > maxCount) {
        maxCount = count;
        this.maximumPost = [item];
      } else if (count === maxCount) {
        this.maximumPost.push(item);
      }

      if (count < minCount) {
        minCount = count;
        this.minimumPost = [item];
      } else if (count === minCount) {
        this.minimumPost.push(item);
      }
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
    //show an empty chart if the given data is null
    if (data == null) {
      data = [];
    }

    //remove old barchart
    d3.select('#post-chart').selectAll('*').remove();

    //This is the only way to pass a reference to 'this' into the onClick listener while also getting the 'data' of the clicked bar as a parameter in the listerner
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const postComponent: PostsComponent = this;

    const margin = { top: 40, right: 20, bottom: 30, left: 0 };
    const width = 1080 - margin.left - margin.right;
    const height = 700 - margin.top - margin.bottom;

    // Get svg based on the id to draw chart
    const svg = d3
      .select('#post-chart')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.year.toString()))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count)] as number[])
      .range([height, 0]);

    const tooltip = svg
      .append('text')
      .attr('class', 'tooltip')
      .attr('x', 0)
      .attr('y', 0)
      .style('color', 'white')
      .style('opacity', 0);

    // Fill the chart with data values
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (d) => x(d.year.toString())!)
      .attr('y', (d) => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.count))
      .attr('fill', '#3B5998')
      .attr('cursor', 'pointer')
      // Show tooltip on mouseover
      .on('mouseover', function (event, d) {
        const barX = x(d.year.toString())! + x.bandwidth() / 2;
        const barY = y(d.count);
        tooltip
          .text(d.count)
          .attr('x', barX - 19)
          .attr('y', barY + 20)
          .style('opacity', 1)
          .style('font-size', '24px')
          .style('z-index', '1000');
      })
      .on('click', function (event, d) {
        postComponent.selectedYear = d.year;
        postComponent.createMonthData(d.year);
      })
      // Change position of tooltip on mouse move
      .on('mousemove', function (event) {
        tooltip
          .style('top', event.pageY - 10 + 'px')
          .style('left', event.pageX + 10 + 'px');
      })
      // Hide tooltip on mouse out
      .on('mouseout', function () {
        tooltip.style('opacity', 0);
      });

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
      .style('font-size', '20px')
      .call(d3.axisBottom(x));

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .style('font-size', '20px')
      .call(d3.axisLeft(y).ticks(10));
  }

  /**
   * This methods generates the data object for month distribution for posts over a year
   * @param year for which we want the monthly distribution
   *
   * @author: rbharmal@mail.upb.de
   *
   */
  createMonthData(year: number) {
    this.postDataMonths = [];
    this.monthView = true;
    const dataObject: any[] = [];
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ];
    this.posts.forEach((x) => {
      const date = new Date(x.timestamp * 1000);
      if (date.getFullYear() === year) {
        const monthName = monthNames[date.getUTCMonth()];
        this.postDataMonths.push({
          month: monthName,
          title: x.title,
          post: x.post,
        });
      }
    });
    console.log(this.postDataMonths);
    monthNames.forEach((month) => {
      const count = this.postDataMonths.filter((x) => x.month == month).length;
      dataObject.push({ month: month, count: count });
    });
    console.log(dataObject);
    let maxCount = -Infinity;
    let minCount = Infinity;

    dataObject.forEach((item) => {
      const count = item.count;

      if (count > maxCount) {
        maxCount = count;
        this.maximumPost = [item];
      } else if (count === maxCount) {
        this.maximumPost.push(item);
      }

      if (count < minCount && count !== 0) {
        minCount = count;
        this.minimumPost = [item];
      } else if (count === minCount) {
        this.minimumPost.push(item);
      }
    });
    this.makeMonthChart(dataObject);
  }

  /**
   * This methods generates the barchart for the post data in monthly distribution for specific year
   * @param data is the array of post data over a specific year
   * @param year for the data
   *
   * @author: rbharmal@mail.upb.de
   *
   */
  makeMonthChart(data: any[]) {
    //show an empty chart if the given data is null
    if (data == null) {
      data = [];
    }

    //This is the only way to pass a reference to 'this' into the onClick listener while also getting the 'data' of the clicked bar as a parameter in the listerner
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const postComponent: PostsComponent = this;
    //remove old barchart
    d3.select('#post-chart').selectAll('*').remove();

    const margin = { top: 40, right: 20, bottom: 30, left: 0 };
    const width = 1050 - margin.left - margin.right;
    const height = 700 - margin.top - margin.bottom;

    // Get svg based on the id to draw chart
    const svg = d3
      .select('#post-chart')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.month.toString()))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count)] as number[])
      .range([height, 0]);

    const tooltip = svg
      .append('text')
      .attr('class', 'tooltip')
      .attr('x', 0)
      .attr('y', 0)
      .style('color', 'white')
      .style('opacity', 0);

    // Fill the chart with data values
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (d) => x(d.month.toString())!)
      .attr('y', (d) => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.count))
      .attr('fill', '#3B5998')
      .on('click', function (event, d) {
        postComponent.selectedMonth = d.month;
        postComponent.showPostList();
      })
      // Show tooltip on mouseover
      .on('mouseover', function (event, d) {
        const barX = x(d.month.toString())! + x.bandwidth() / 2;
        const barY = y(d.count);
        tooltip
          .text(d.count)
          .attr('x', barX - 19)
          .attr('y', barY + 20)
          .style('opacity', 1)
          .style('font-size', '24px');
      })
      // Change position of tooltip on mouse move
      .on('mousemove', function (event) {
        tooltip
          .style('top', event.pageY - 10 + 'px')
          .style('left', event.pageX + 10 + 'px');
      })
      // Hide tooltip on mouse out
      .on('mouseout', function () {
        tooltip.style('opacity', 0);
      });

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
      .style('font-size', '20px')
      .call(d3.axisBottom(x));

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .style('font-size', '20px')
      .call(d3.axisLeft(y).ticks(10));
  }

  /**
   * This methods gets the yearly barchart
   *
   * @author: rbharmal@mail.upb.de
   *
   */
  backToPrevious() {
    this.isShowPostList = false;
    this.monthView = false;
    this.createYearData();
  }

  /**
   * Shows post list for the respective month clicked
   *
   * @author: Rashida (rbharmal@mail.upb.de)
   *
   */
  showPostList() {
    this.isShowPostList = true;
    const el = document.getElementById('basicTable');
    el?.scrollIntoView();
    this.postDataFilter = this.postDataMonths.filter(
      (x) => x.month === this.selectedMonth,
    );
  }
}
