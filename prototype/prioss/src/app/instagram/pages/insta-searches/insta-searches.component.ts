import { AfterViewInit, Component, Input, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { InstaState } from '../../state/insta.state';
import { InstaUserSearch } from 'src/app/instagram/models/Searches/InstaUserSearch';
import { InstaKeywordSearch } from 'src/app/instagram/models/Searches/InstaKeywordSearch';
import { InstaTagSearch } from 'src/app/instagram/models/Searches/InstaTagSearches';
import { EChartsOption } from 'echarts';
import { provideEcharts } from 'ngx-echarts';
import { SequenceComponentInit } from '../../../features/utils/sequence-component-init.abstract';
import { WordCloudComponent } from "../../../features/word-cloud/word-cloud.component";
import {DataRangeCalculatorService} from "../../service/echarts/data-range-calculator.service";

@Component({
  selector: 'app-insta-searches',
  templateUrl: './insta-searches.component.html',
  styleUrls: ['./insta-searches.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideEcharts()]
})
export class InstaSearchesComponent extends SequenceComponentInit implements AfterViewInit, OnInit {

  @Input() previewMode = false;
  userSearchValue = '';
  keywordSearchValue = '';
  tagSearchValue = '';
  visible = false;
  chartOptions: EChartsOption;
  userSearches: InstaUserSearch[] = [];
  keywordSearches: InstaKeywordSearch[] = [];
  tagSearches: InstaTagSearch[] = [];
  topicsWordData: string[] = [];
  filteredWordData: string[] = [];

  @ViewChild('wordCloudRef', { static: false }) wordCloud: WordCloudComponent;

  constructor(private store: Store, private rangeCalculator:DataRangeCalculatorService) {
    super();
  }

  ngOnInit() {
    const { keywordSearch, tagSearch, userSearch } = this.store.selectSnapshot(InstaState.getUserSearchData);
    this.userSearches = userSearch;
    this.keywordSearches = keywordSearch;
    this.tagSearches = tagSearch;
    this.populateWordData();
    this.filteredWordData = [...this.topicsWordData];
    this.updateChartOptions();
  }

  ngAfterViewInit() {
    if (!this.previewMode) {
      this.initComponent();
    }
  }

  populateWordData() {
    this.topicsWordData = [];
    this.userSearches.forEach(search => this.topicsWordData.push(search.search));
    this.keywordSearches.forEach(search => this.topicsWordData.push(search.search));
    this.tagSearches.forEach(search => this.topicsWordData.push(search.search));
  }

  filterData(type: string) {
    switch (type) {
      case 'user':
        this.filteredWordData = this.userSearches.map(search => search.search);
        break;
      case 'keyword':
        this.filteredWordData = this.keywordSearches.map(search => search.search);
        break;
      case 'tag':
        this.filteredWordData = this.tagSearches.map(search => search.search);
        break;
      default:
        this.filteredWordData = [...this.topicsWordData];
        break;
    }
    this.redrawCloud();
  }

  async initComponent(): Promise<void> {
    return Promise.resolve();
  }

  override async initBaseComponent(): Promise<void> {

  }

  redrawCloud() {
    this.wordCloud.reDraw();
  }

  downloadCloud() {
    this.wordCloud.saveAsImage();
  }

  reset(searchList: string): void {
    switch (searchList) {
      case 'user':
        this.userSearchValue = '';
        break;
      case 'keyword':
        this.keywordSearchValue = '';
        break;
      case 'tag':
        this.tagSearchValue = '';
        break;
      default:
        break;
    }

    this.search(searchList);
  }

  search(searchList: string): void {
    this.visible = false;

    switch (searchList) {
      case 'user':
        this.userSearches = this.userSearches.filter((item: InstaUserSearch) => item.search.toLowerCase().indexOf(this.userSearchValue.toLowerCase()) !== -1);
        break;
      case 'keyword':
        this.keywordSearches = this.keywordSearches.filter((item: InstaKeywordSearch) => item.search.toLowerCase().indexOf(this.keywordSearchValue.toLowerCase()) !== -1);
        break;
      case 'tag':
        this.tagSearches = this.tagSearches.filter((item: InstaTagSearch) => item.search.toLowerCase().indexOf(this.tagSearchValue.toLowerCase()) !== -1);
        break;
      default:
        break;
    }
  }

  updateChartOptions() {
    const dateRange = this.rangeCalculator.getDateRangeArray([...this.userSearches,...this.keywordSearches,...this.tagSearches].map((data)=>data.timestamp));
    this.chartOptions = {
      title: {
        text: 'Instagram Searches Over Time',
        left: 'center',
        textStyle: {
          fontSize: 20,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          let result = '';
          params.forEach((item: any) => {
            result += `${item.seriesName}: ${item.data}<br/>`;
          });
          return result;
        }
      },
      legend: {
        data: ['User Searches', 'Keyword Searches', 'Tag Searches'],
        bottom: 0,
        textStyle: {
          fontSize: 14
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: dateRange,
        axisLabel: {
          rotate: 0,
          formatter: (value: string) => value,
          fontSize: 14
        }
      },
      yAxis: {
        type: 'value',
        minInterval: 1,
        axisLabel: {
          formatter: '{value}',
          fontSize: 14
        }
      },
      series: [
        {
          name: 'User Searches',
          type: 'line',
          data: this.rangeCalculator.countOccurrencesInRange(dateRange, [...this.userSearches].map(data => data.timestamp)),
          smooth: true,
          itemStyle: {
            color: '#5470C6'
          },
          label: {
            show: true,
            fontSize: 14
          }
        },
        {
          name: 'Keyword Searches',
          type: 'line',
          data: this.rangeCalculator.countOccurrencesInRange(dateRange, [...this.keywordSearches].map(data => data.timestamp)),
          smooth: true,
          itemStyle: {
            color: '#91CC75'
          },
          label: {
            show: true,
            fontSize: 14
          }
        },
        {
          name: 'Tag Searches',
          type: 'line',
          data: this.rangeCalculator.countOccurrencesInRange(dateRange, [...this.tagSearches].map(data => data.timestamp)),
          smooth: true,
          itemStyle: {
            color: '#FAC858'
          },
          label: {
            show: true,
            fontSize: 14
          }
        }
      ],
      backgroundColor: '#FFFFFF'
    };
  }
}
