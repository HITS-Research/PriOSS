import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pascalSpacing',
  standalone: true,
})
export class PascalSpacingPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/([a-z])([A-Z])/g, '$1 $2');
  }

}
