import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decodeUnicode',
})
export class DecodeUnicodePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return value;
    }
    return decodeURIComponent(JSON.parse('"' + value.replace(/\\u/g, '\\u') + '"'));
  }
}
