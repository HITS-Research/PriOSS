import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis',
  standalone:true
})
export class EllipsisPipe implements PipeTransform {

  transform(value: string, limit: number = 20): unknown {
    if (!value) return '';
    if (value.length <= limit) return value;
    return value.substring(0, limit) + '...';
  }
}
