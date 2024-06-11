import { Injectable } from '@angular/core';
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DataRangeCalculatorService {

  constructor() { }

  public getDateRangeArray(data: (string | number)[],isTimeinMS:boolean=false): string[] {
    const dateSet = new Set<string>();
    data.forEach(item => {
      const date = new Date((typeof item==="number"?item:+item)*(isTimeinMS?1:1000));
      const formattedDate = formatDate(date, 'MMMyy', 'en-US');
      dateSet.add(formattedDate);
    });
    return Array.from(dateSet).sort((a, b) => {
      const dateA = new Date(`01-${a}`);
      const dateB = new Date(`01-${b}`);
      return dateA.getTime() - dateB.getTime();
    });
  }

  public countOccurrencesInRange(dateRange: string[], data: (string | number)[],isTimeinMS:boolean=false): number[] {
    const countMap: { [key: string]: number } = {};
    dateRange.forEach(date => {
      countMap[date] = 0;
    });
    data.forEach(item => {
      const date = new Date((typeof item==="number"?item:+item)*(isTimeinMS?1:1000));
      const formattedDate = formatDate(date, 'MMMyy', 'en-US');
      if (formattedDate in countMap) {
        countMap[formattedDate]++;
      }
    });
    return dateRange.map(date => countMap[date]);
  }
}

