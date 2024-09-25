import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EChartsOption, SeriesOption } from 'echarts';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { FbUserDataModel } from 'src/app/facebook/state/models';

/**
 * Component for displaying the top liked Facebook pages based on user reactions.
 */
@Component({
  selector: 'prioss-fb-top-liked-pages',
  standalone: true,
  imports: [NgxEchartsDirective, FormsModule, NzFormModule, NzInputNumberModule, CommonModule],
  providers: [provideEcharts()],
  templateUrl: './fb-top-liked-pages.component.html',
  styleUrl: './fb-top-liked-pages.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FbTopLikedPagesComponent {
  /** Input for user data */
  userData = input.required<FbUserDataModel>();

  /** Number of top pages to display */
  amountOfTopPages = signal<number>(5);

  /** Computed property for liked pages */
  pages = computed(() => {
    if (!this.userData) return [];
    const pages = [];
    for (const page of this.userData().activity_across_facebook.likedPages?.page_likes_v2 ?? []) {
      pages.push(page.name);
    }
    return pages;
  });

  /** Computed property for reactions per page */
  reactionsPerPage = computed(() => {
    if (!this.userData) return {};
    const reactsPerPage: Record<string, Record<string, number>> = {};
    const reactions = this.userData().activity_across_facebook?.likesAndReactions?.likes_and_reactions ?? [];
    const likedPages = this.userData().activity_across_facebook?.likedPages?.page_likes_v2 ?? [];
    for (const page of likedPages) {
      const count: Record<string, number> = {};
      for (const react of reactions ?? []) {
        if (react.title.includes(page.name)) {
          const reaction = react.data[0].reaction.reaction.charAt(0).toUpperCase() + react.data[0].reaction.reaction.slice(1).toLowerCase();
          count[reaction] = count[reaction] + 1 || 0;
        }
      }
      reactsPerPage[page.name] = count;
    }
    return reactsPerPage;
  });

  /** Computed property for sum of reactions per page */
  getSumOfReactionsPerPage = computed(() => {
    const reactsPerPage = this.reactionsPerPage();
    const sumOfReactions = new Map<string, number>();
    for (const page in reactsPerPage) {
      let sum = 0;
      for (const reaction in reactsPerPage[page]) {
        sum += reactsPerPage[page][reaction];
      }
      sumOfReactions.set(page, sum);
    }
    return sumOfReactions;
  });

  /** Computed property for top pages based on reactions */
  getTopPages = computed(() => {
    const sumOfReactions = this.getSumOfReactionsPerPage();
    const sorted = new Map([...sumOfReactions.entries()].sort((a, b) => b[1] - a[1]));
    const sortedArray = Array.from(sorted).slice(0, this.amountOfTopPages());
    return sortedArray;
  });

  /** Computed property for creating chart series data */
  createSeries = computed(() => {
    const reactsPerPage = this.reactionsPerPage();
    const topPersons = this.getTopPages();
    const seriesOptions: SeriesOption[] = [];
    for (const reaction of this.reactionTypes()) {
      const data = [];
      for (const page of topPersons) {
        data.push({
          name: page[0],
          value: reactsPerPage[page[0]][reaction] ?? 0
        });
      }
      seriesOptions.push({
        name: reaction,
        type: 'bar',
        stack: 'total',
        data: data
      });
    }
    return seriesOptions;
  });

  /** Computed property for getting unique reaction types */
  reactionTypes = computed(() => {
    const reactionTypes = new Set<string>();
    const reactions = this.userData().activity_across_facebook?.likesAndReactions?.likes_and_reactions ?? []
    for (const reaction of reactions) {
      const capitalizedType = reaction.data[0].reaction.reaction.charAt(0).toUpperCase() + reaction.data[0].reaction.reaction.slice(1).toLowerCase();
      reactionTypes.add(capitalizedType);
    }
    return Array.from(reactionTypes);
  });

  /** Computed property for ECharts options */
  options = computed(() => {
    const options: EChartsOption = {
      tooltip: {
        trigger: 'axis'
      },
      aria: {
        enabled: true,
        decal: {
          show: true
        }
      },
      legend: {
        data: this.reactionTypes()
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        data: this.getTopPages().map((page) => page[0]),
        axisLabel: {
          interval: 0,
          rotate: 10,
          overflow: 'break'
        },
      },
      yAxis: {
        type: 'value',
        minInterval: 1
      },
      series: this.createSeries()
    }
    return options;
  });
}