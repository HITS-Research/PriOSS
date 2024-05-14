import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EChartsOption, SeriesOption } from 'echarts';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import {  FbUserDataModel } from 'src/app/facebook/state/models';

@Component({
  selector: 'prioss-top-liked-persons',
  standalone: true,
  imports: [NgxEchartsDirective, FormsModule, NzFormModule, NzInputNumberModule, CommonModule],
  providers: [provideEcharts()],
  templateUrl: './top-liked-persons.component.html',
  styleUrl: './top-liked-persons.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopLikedPersonsComponent {
  userData = input.required<FbUserDataModel>();
  
  amountOfTopPersons = signal<number>(5);

  persons = computed(() => {
    if (!this.userData) return [];
    const persons = [];
    for (const friend of this.userData().connections.yourFriends.friends_v2){
      persons.push(friend.name);
    }
    return persons;
  });

  reactionsPerPerson = computed(() => {
    if (!this.userData) return {};
    const reactsPerPerson: Record<string, Record<string, number>> = {};
    const reactions = this.userData().activity_across_facebook.likesAndReactions?.likes_and_reactions??[];
    const friends = this.userData().connections.yourFriends.friends_v2??[];
    for (const friend of friends){
      const count: Record<string, number> ={};
      for (const react of reactions??[]){
        if(react.title.includes(friend.name)){
          const reaction = react.data[0].reaction.reaction.charAt(0).toUpperCase() + react.data[0].reaction.reaction.slice(1).toLowerCase();
          count[reaction] = count[reaction] + 1 || 0;
        }
      }
      reactsPerPerson[friend.name] = count;
    }
    return reactsPerPerson;
  });

  getSumOfReactionsPerPerson = computed(() => {
    const reactsPerPerson = this.reactionsPerPerson();
    //create a sum of all reactions for each person
  const sumOfReactions = new Map<string, number>();
  for (const person in reactsPerPerson){
    let sum = 0;
    for (const reaction in reactsPerPerson[person]){
      sum += reactsPerPerson[person][reaction];
    }
    sumOfReactions.set(person, sum);
  }
  return sumOfReactions;
  });

  getTopPersons = computed(() => {
    const sumOfReactions = this.getSumOfReactionsPerPerson();
    //sort the sum of reactions
    const sorted = new Map([...sumOfReactions.entries()].sort((a, b) => b[1] - a[1]));
    const sortedArray = Array.from(sorted).slice(0, this.amountOfTopPersons()) 
    return sortedArray;
  });

  createSeries= computed(() => {
    const reactsPerPerson = this.reactionsPerPerson();
    const topPersons = this.getTopPersons();
    const seriesOptions: SeriesOption[] = [];
    //create a stacked bar seriesoption, where a category on the x axis is the person and the stacked bar is composed of the reactions
    for (const reaction of this.reactionTypes()){
      const data = [];
      for (const person of topPersons){
        data.push({
          name: person[0],
          value: reactsPerPerson[person[0]][reaction]??0});
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

  reactionTypes = computed(() => {
    const reactionTypes = new Set<string>();
    const reactions = this.userData().activity_across_facebook.likesAndReactions?.likes_and_reactions??[]
    for (const reaction of reactions) {
        const capitalizedType = reaction.data[0].reaction.reaction.charAt(0).toUpperCase() + reaction.data[0].reaction.reaction.slice(1).toLowerCase();
        reactionTypes.add(capitalizedType);
    }
    return Array.from(reactionTypes);
  });

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
        data: this.getTopPersons().map((person) => person[0]),
        axisLabel: {
          rotate: 10
        }
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
