import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {SequenceComponentInit} from '../../../features/utils/sequence-component-init.abstract';
import {InstaChatData} from 'src/app/instagram/models/MessageInfo/InstaChatData';
import {InstaChatPartnerData} from 'src/app/instagram/models/MessageInfo/InstaChatData'
import {Store} from "@ngxs/store";
import {InstaState} from "../../state/insta.state";

const weekday = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

interface UserMessages {
  chat: string;
  messages: number;
}

interface UserInOutMessages {
  weekday: string;
  ingoing: number;
  outgoing: number;
}

interface ChatData {
  chat: string;
  yourMessages: number;
  otherMessages: {
    sender: string;
    messages: number;
    avg: number;
    text: number;
    share: number;
    audio: number;
    photos: number;
  }[];
}

/**
 * This component is the visualization component on instagram's dashboard page.
 * This page is shown message information on instagram's dashboard.
 *
 * @author: Melina (kleber@mail.uni-paderborn.de)
 */
@Component({
  selector: 'app-insta-messages',
  templateUrl: './insta-messages.component.html',
  styleUrls: ['./insta-messages.component.less'],
})
export class InstaMessagesComponent
  extends SequenceComponentInit
  implements AfterViewInit, OnInit {
  @Input()
  previewMode = false;

  instaChatData: InstaChatData[] = [];
  instaChatPartnerData: InstaChatPartnerData[] = [];

  //Some variables for the highlights
  totalSentMessages = 0;
  totalReceivedMessages = 0;
  totalGroupChats = 0;

  // Variables for the grouped bar chart
  userInOutMessages: UserInOutMessages[] = [
    {weekday: weekday[1], outgoing: 0, ingoing: 0},
    {weekday: weekday[2], outgoing: 0, ingoing: 0},
    {weekday: weekday[3], outgoing: 0, ingoing: 0},
    {weekday: weekday[4], outgoing: 0, ingoing: 0},
    {weekday: weekday[5], outgoing: 0, ingoing: 0},
    {weekday: weekday[6], outgoing: 0, ingoing: 0},
    {weekday: weekday[0], outgoing: 0, ingoing: 0},
  ];

  // Variables for the blue horizontal bar chart
  userOutMessages: UserMessages[] = [];

  // Variables for the orange horizontal bar chart
  userInMessages: UserMessages[] = [];

  //the panels for the collapsable
  panels: {
    active: boolean;
    name: string;
    content: string;
  }[] = [];

  //Chat data used to fill the collapsable
  chatData: ChatData[] = [];

  constructor(private store: Store) {
    super();
  }


  ngOnInit() {
    this.instaChatData = this.store.selectSnapshot(InstaState.getUserChatData);
    this.instaChatData.forEach((data: InstaChatData) => {
      this.instaChatPartnerData.push(...data.otherMessages);
    })
    this.chatData = this.instaChatData.map((chat) => {
      return {
        chat: chat.chat,
        yourMessages: chat.yourMessages,
        otherMessages: chat.otherMessages.map((otherMessage) => {
          return {
            sender: otherMessage.sender,
            messages: otherMessage.messages,
            avg: otherMessage.avg,
            text: otherMessage.text,
            share: otherMessage.share,
            audio: otherMessage.audio,
            photos: otherMessage.photos,
          };
        }),
      };
    });
    this.instaChatData.forEach((chat) => {
      this.userInOutMessages[0].outgoing += chat.monday;
      this.userInOutMessages[1].outgoing += chat.tuesday;
      this.userInOutMessages[2].outgoing += chat.wednesday;
      this.userInOutMessages[3].outgoing += chat.thursday;
      this.userInOutMessages[4].outgoing += chat.friday;
      this.userInOutMessages[5].outgoing += chat.saturday;
      this.userInOutMessages[6].outgoing += chat.sunday;
      this.userOutMessages.push({
        chat: chat.chat,
        messages: chat.yourMessages,
      });
      let inMessages = 0;
      chat.otherMessages.forEach((otherMessage) => {
        this.userInOutMessages[0].ingoing += otherMessage.monday;
        this.userInOutMessages[1].ingoing += otherMessage.tuesday;
        this.userInOutMessages[2].ingoing += otherMessage.wednesday;
        this.userInOutMessages[3].ingoing += otherMessage.thursday;
        this.userInOutMessages[4].ingoing += otherMessage.friday;
        this.userInOutMessages[5].ingoing += otherMessage.saturday;
        this.userInOutMessages[6].ingoing += otherMessage.sunday;
        inMessages += otherMessage.messages;
      });
      this.userInMessages.push({chat: chat.chat, messages: inMessages});
    });

    this.userInMessages.forEach((data) => {
      this.totalReceivedMessages += data.messages;
    });
    this.userOutMessages.forEach((data) => {
      this.totalSentMessages += data.messages;
    });
    this.chatData.forEach((data) => {
      if (data.otherMessages.length > 1) {
        this.totalGroupChats++;
      }
    });
  }

  /**
   * Stores all needed data from the different tables into the corresponding interface variables.
   *
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  async collectData() {
    this.makeGroupedBarChart(this.userInOutMessages);
    this.makeBarChart(
      this.userOutMessages,
      '#bar1',
      '#contextmenu-bar1',
      '#4f5bd5'
    );
    this.makeBarChart(
      this.userInMessages,
      '#bar2',
      '#contextmenu-bar2',
      '#fa7e1e'
    );
    for (let i = 0; i < this.chatData.length; i++) {
      if (i == 0) {
        this.panels.push({
          active: true,
          name: this.chatData[i].chat,
          content: this.chatData[i].chat,
        });
      } else {
        this.panels.push({
          active: false,
          name: this.chatData[i].chat,
          content: this.chatData[i].chat,
        });
      }
    }
    this.on_collapsable_page_enter();
  }

  /**
   * This function fills the the charts in the collapsable.
   *
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  initCollapsable() {
    for (let i = 0; i < this.chatData.length; i++) {
      this.makeHorizontalStackedBarChart(
        [this.chatData[i]],
        this.trimWhitespace(this.chatData[i].chat) + '-barChart-container',
        this.trimWhitespace(this.chatData[i].chat) +
        '-contextmenu-barChart-container'
      );
      this.makeAverageMessageChart(
        this.chatData[i],
        this.trimWhitespace(this.chatData[i].chat) + '-avg-container',
        this.trimWhitespace(this.chatData[i].chat) +
        '-contextmenu-avg-container'
      );
    }
  }

  /**
   * This function adds a small delay in loading the collapsable that the DOM elements are not null.
   *
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  async on_collapsable_page_enter() {
    while (
      !document.getElementById(
        this.trimWhitespace(this.chatData[0].chat) + '-barChart-container'
      )
      ) {
      await new Promise((r) => setTimeout(r, 100));
    }
    this.initCollapsable();
  }

  /**
   * Builds the elements for the messages.
   *
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  async ngAfterViewInit() {
    if (!this.previewMode) {
      await this.initComponent();
    }
  }

  trimWhitespace(text: string) {
    return text.replace(/\s/g, '');
  }

  override async initComponent(): Promise<void> {
    console.log('--- Initializing Component 10: Messages');
    await this.collectData();
  }

  /**
   * Creates the horizontal stacked bar chart.
   * @param data for the chart
   * @param container where it is displayed
   * @param tooltipContainer
   *
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  makeHorizontalStackedBarChart(
    data: ChatData[],
    container: string,
    tooltipContainer: string
  ) {
    // set the dimensions and margins of the graph
    const margin = {top: 20, right: 30, bottom: 40, left: 90},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    if (document.getElementById(container)?.innerHTML != '') {
      return;
    }

    // append the svg object to the body of the page
    const svg = d3
      .select('#' + container)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const senders = new Set<string>();
    senders.add('me');
    data.forEach((d: ChatData) => {
      d.otherMessages.forEach((otherMessage) =>
        senders.add(otherMessage.sender)
      );
    });
    const subgroups = Array.from(senders);
    const flattenedData: any[] = [];
    data.forEach((chatData: ChatData) => {
      const myMessages: any = {chat: `Me to ${chatData.chat}`};
      const otherMessages: any = {chat: chatData.chat};
      subgroups.forEach((sender: string) => {
        myMessages[sender] = 0;
        otherMessages[sender] =
          chatData.otherMessages.find(
            (otherMessage) => otherMessage.sender === sender
          )?.messages || 0;
      });
      flattenedData.push({...myMessages, me: chatData.yourMessages});
      flattenedData.push(otherMessages);
    });
    const groups = d3.map(flattenedData, (chatData) => {
      return chatData.chat;
    });

    //find the custom contextmenu
    const contextMenu = d3.select('#' + tooltipContainer);

    //stack the data? --> stack per subgroup
    const stackedData = d3.stack().keys(subgroups)(flattenedData);

    // highest bar
    const maxValue = stackedData[stackedData.length - 1].reduce(
      (max, stack) => Math.max(max, stack[1]),
      0
    );

    //Add X axis
    const x = d3.scaleLinear().domain([0, maxValue>10?maxValue:10]).range([0, width]);
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    //Add Y axis
    const y = d3.scaleBand().domain(groups).range([0, height]).padding(0.2);
    svg.append('g').call(d3.axisLeft(y));

    // create tooltip element
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'd3-tooltip')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style("display", "none")
      .style('padding', '15px')
      .style('background', 'rgba(0,0,0,0.6)')
      .style('border-radius', '5px')
      .style('color', '#fff')
      .text('a simple tooltip');

    // Show the bars
    svg
      .append('g')
      .selectAll('g')
      // Enter in the stack data = loop key per key = group per group
      .data(stackedData)
      .enter()
      .append('g')
      .attr('fill', (d) => {
        return (
          this.colorFactory(subgroups.length)[
            subgroups.findIndex((sender) => sender === d.key)
            ] ?? '#999999'
        );
      })
      .selectAll('rect')
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data((d) => d)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d[0]))
      .attr('y', (d) => {
        return y('' + d.data['chat']) || (0 as number);
      })
      .attr('height', y.bandwidth())
      .attr('width', (d) => {
        return x(d[1]) - x(d[0]);
      })

      //Mouse Hover
      .on('mouseover', (event, data) => {
        contextMenu.style('visibility', 'hidden');
        const sender = stackedData.find((stack) => stack.includes(data))?.key;
        const html = tooltip.html(
          'Sender: ' + sender + ', messages: ' + (data[1] - data[0]).toString()
        );
        d3.select('#' + tooltipContainer).style('cursor', 'pointer');
        html.style('visibility', 'visible').style('text-align', 'center');
      })
      //Mouse moved: change tooltip position
      .on('mousemove', function (event) {
        tooltip
          .style('top', event.pageY - 10 + 'px')
          .style('left', event.pageX + 10 + 'px');
      })
      //Mouse not hovering: hide tooltip
      .on('mouseout', function () {
        tooltip.html(``).style('visibility', 'hidden');
      });
  }

  //Lot of colors for the charts
  otherMessageColors: string[] = [
    '#1f77b4',
    '#ff7f0e',
    '#2ca02c',
    '#d62728',
    '#9467bd',
    '#8c564b',
    '#e377c2',
    '#7f7f7f',
    '#bcbd22',
    '#17becf',
    '#393b79',
    '#e6550d',
    '#31a354',
    '#d62728',
    '#756bb1',
    '#8ca252',
    '#1f77b4',
    '#b2df8a',
    '#fd8d3c',
    '#6b6ecf',
    '#bd9e39',
    '#2ca02c',
    '#ff9896',
    '#9467bd',
    '#c5b0d5',
    '#8c564b',
    '#c49c94',
    '#e377c2',
    '#f7b6d2',
    '#7f7f7f',
    '#c7c7c7',
    '#bcbd22',
    '#dbdb8d',
    '#17becf',
    '#9edae5',
    '#393b79',
    '#7b4173',
    '#5254a3',
    '#ce6dbd',
    '#3182bd',
    '#e6550d',
    '#fd8d3c',
    '#fdae6b',
    '#31a354',
    '#74c476',
    '#a1d99b',
    '#c7e9c0',
    '#756bb1',
    '#9e9ac8',
    '#bcbddc',
  ];
  currentColorIndex = this.otherMessageColors.length - 1;
  colorFactory = (senderAmount: number) => {
    const colors: string[] = ['#377eb8'];
    for (let i = 1; i < senderAmount; i++) {
      this.currentColorIndex =
        (this.currentColorIndex + 1) % this.otherMessageColors.length;
      colors.push(this.otherMessageColors[this.currentColorIndex]);
    }
    return colors;
  };

  /**
   * Creates a horizontal bar chart.
   * @param data for the chart
   * @param container where it is displayed
   * @param tooltipContainer
   *
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  makeAverageMessageChart(
    data: ChatData,
    container: string,
    tooltipContainer: string
  ) {
    // set the dimensions and margins of the graph
    const margin = {top: 20, right: 30, bottom: 40, left: 90},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    if (document.getElementById(container)?.innerHTML != '') {
      return;
    }

    // append the svg object to the body of the page
    const svg = d3
      .select('#' + container)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const maxValue = Math.max(...data.otherMessages.map((o) => o.avg));

    // Add X axis
    const x = d3.scaleLinear().domain([0, maxValue>10?maxValue:10]).range([0, width]);
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // List of chats (their names) -> labels for the y-axis
    const labels = d3.map(data.otherMessages, function (d) {
      return d.sender;
    });

    // Y axis
    const y = d3.scaleBand().range([0, height]).domain(labels).padding(0.2);
    svg.append('g').call(d3.axisLeft(y));

    // create tooltip element
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'd3-tooltip')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style("display", "none")
      .style('padding', '15px')
      .style('background', 'rgba(0,0,0,0.6)')
      .style('border-radius', '5px')
      .style('color', '#fff')
      .text('a simple tooltip');

    //find the custom contextmenu
    const contextMenu = d3.select('#' + tooltipContainer);

    // Show the bars
    svg
      .selectAll('myRect')
      .data(data.otherMessages)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', function (d) {
        return y(d.sender) || 0;
      })
      .attr('width', function (d) {
        return x(d.avg);
      })
      .attr('height', y.bandwidth())
      .attr('fill', '#d62976')
      //Mouse Hover
      .on('mouseover', (event, data) => {
        contextMenu.style('visibility', 'hidden');
        const html = tooltip.html(data.avg.toString());
        d3.select('#' + tooltipContainer).style('cursor', 'pointer');

        html.style('visibility', 'visible').style('text-align', 'center');
      })
      //Mouse moved: change tooltip position
      .on('mousemove', function (event) {
        tooltip
          .style('top', event.pageY - 10 + 'px')
          .style('left', event.pageX + 10 + 'px');
      })
      //Mouse not hovering: hide tooltip
      .on('mouseout', function () {
        tooltip.html(``).style('visibility', 'hidden');
      });
  }

  /**
   * Creates the horizontal bar charts.
   * @param data for the chart
   * @param container where it is displayed
   * @param tooltipContainer
   * @param color of the bars
   *
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  makeBarChart(
    data: UserMessages[],
    container: string,
    tooltipContainer: string,
    color: string
  ) {
    // set the dimensions and margins of the graph
    const margin = {top: 20, right: 30, bottom: 40, left: 90},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select(container)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const maxValue = Math.max(...data.map((o) => o.messages));

    // Add X axis
    const x = d3.scaleLinear().domain([0, maxValue>10?maxValue:10]).range([0, width]);
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // List of chats (their names) -> labels for the y-axis
    const labels = d3.map(data, function (d) {
      return d.chat;
    });

    // Y axis
    const y = d3.scaleBand().range([0, height]).domain(labels).padding(0.2);
    svg.append('g').call(d3.axisLeft(y));

    // create tooltip element
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'd3-tooltip')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style("display", "none")
      .style('padding', '15px')
      .style('background', 'rgba(0,0,0,0.6)')
      .style('border-radius', '5px')
      .style('color', '#fff')
      .text('a simple tooltip');

    //find the custom contextmenu
    const contextMenu = d3.select(tooltipContainer);

    // Show the bars
    svg
      .selectAll('myRect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', function (d) {
        return y(d.chat) || 0;
      })
      .attr('width', function (d) {
        return x(d.messages);
      })
      .attr('height', y.bandwidth())
      .attr('fill', color)
      //Mouse Hover
      .on('mouseover', (event, data) => {
        contextMenu.style('visibility', 'hidden');
        const html = tooltip.html(data.messages.toString());
        d3.select(tooltipContainer).style('cursor', 'pointer');

        html.style('visibility', 'visible').style('text-align', 'center');
      })
      //Mouse moved: change tooltip position
      .on('mousemove', function (event) {
        tooltip
          .style('top', event.pageY - 10 + 'px')
          .style('left', event.pageX + 10 + 'px');
      })
      //Mouse not hovering: hide tooltip
      .on('mouseout', function () {
        tooltip.html(``).style('visibility', 'hidden');
      });
  }

  /**
   * Creates the vertial grouped bar chart.
   * @param data for the chart
   *
   * @author: Melina (kleber@mail.uni-paderborn.de)
   */
  makeGroupedBarChart(userInOutMessages: UserInOutMessages[]) {
    const highestValue = Math.max(
      ...userInOutMessages.map((o) => o.ingoing),
      ...userInOutMessages.map((o) => o.outgoing)
    );
    const legendWidth = 70;
    // set the dimensions and margins of the graph
    const margin = {top: 10, right: 30, bottom: 20, left: 50},
      width = 550 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
    if (document.getElementById('inOutBar')?.innerHTML != '') {
      return;
    }
    // append the svg object to the body of the page
    const svg = d3
      .select('#inOutBar')
      .append('svg')
      .attr('width', width + margin.left + margin.right + legendWidth)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Parse the Data

    // List of subgroups = header of the csv files = soil condition here
    const subgroups = ['ingoing', 'outgoing'];

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    const groups = d3.map(userInOutMessages, function (d) {
      return d.weekday;
    });

    // Add X axis
    const x = d3.scaleBand().domain(groups).range([0, width]).padding(0.2);
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x).tickSize(0));

    // Add Y axis
    const y = d3.scaleLinear().domain([0, highestValue]).range([height, 0]);
    svg.append('g').call(d3.axisLeft(y));

    // Another scale for subgroup position?
    const xSubgroup = d3
      .scaleBand()
      .domain(subgroups)
      .range([0, x.bandwidth()])
      .padding(0.05);

    // create tooltip element
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'd3-tooltip')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style("display", "none")
      .style('padding', '15px')
      .style('background', 'rgba(0,0,0,0.6)')
      .style('border-radius', '5px')
      .style('color', '#fff')
      .text('a simple tooltip');

    //find the custom contextmenu
    const contextMenu = d3.select('#contextmenu');

    // Show the bars
    svg
      .append('g')
      .selectAll('g')
      // Enter in data = loop group per group
      .data(userInOutMessages)
      .enter()
      .append('g')
      .attr('transform', (d) => {
        return 'translate(' + x(d.weekday.toString()) + ',0)';
      })
      .selectAll('rect')
      .data((d) => [
        {key: 'ingoing', value: d.ingoing},
        {key: 'outgoing', value: d.outgoing},
      ])
      .enter()
      .append('rect')
      .attr('x', (d) => {
        return xSubgroup(d.key) || 0;
      })
      .attr('y', (d) => {
        return y(d.value);
      })
      .attr('width', xSubgroup.bandwidth())
      .attr('height', (d) => {
        return height - y(d.value);
      })
      .attr('fill', (d) => {
        if (d.key === 'ingoing') {
          return '#fa7e1e';
        } else {
          return '#4f5bd5';
        }
      })
      //Mouse Hover
      .on('mouseover', (event, data) => {
        contextMenu.style('visibility', 'hidden');
        const html = tooltip.html(data.value.toString());
        d3.select('#contextmenu').style('cursor', 'pointer');

        html.style('visibility', 'visible').style('text-align', 'center');
      })
      //Mouse moved: change tooltip position
      .on('mousemove', function (event) {
        tooltip
          .style('top', event.pageY - 10 + 'px')
          .style('left', event.pageX + 10 + 'px');
      })
      //Mouse not hovering: hide tooltip
      .on('mouseout', function () {
        tooltip.html(``).style('visibility', 'hidden');
      });
    svg
      .append('circle')
      .attr('cx', width + 10)
      .attr('cy', 130)
      .attr('r', 6)
      .style('fill', '#fa7e1e');
    svg
      .append('circle')
      .attr('cx', width + 10)
      .attr('cy', 160)
      .attr('r', 6)
      .style('fill', '#4f5bd5');
    svg
      .append('text')
      .attr('x', width + 25)
      .attr('y', 130)
      .text('Ingoing')
      .style('font-size', '15px')
      .attr('alignment-baseline', 'middle');
    svg
      .append('text')
      .attr('x', width + 25)
      .attr('y', 160)
      .text('Outgoing')
      .style('font-size', '15px')
      .attr('alignment-baseline', 'middle');
  }
}
