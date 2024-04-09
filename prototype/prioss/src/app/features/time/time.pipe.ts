import { Pipe, PipeTransform } from '@angular/core';

/**
 * Transforms a given number to a defined type.
 */
@Pipe({
  name: 'time',
  standalone: true
})
export class TimePipe implements PipeTransform {

  /**
   * Transforms a given number to a defined type.
   * @param value The number which should be transformed
   * @param args The format, it should become.
   * @returns The formatted value.
   */
  transform(value: string | number, ...args: string[]): string {
    const pre = typeof value === 'string'
      ? parseFloat(value)
      : value;

    switch (args[0]) {
      case 'number-as-minutes': {
        const minutes = Math.floor(pre);
        const seconds = Math.floor((pre - minutes) * 60);
        const minutesString = minutes.toString().padStart(2, '0');
        const secondsString = seconds.toString().padStart(2, '0');
        return `${minutesString}m ${secondsString}s`;
      }
      case 'ms-to-sec': {
        const seconds = Math.floor(pre / 1000);
        const milliSeconds = pre - (seconds * 1000);
        return `${seconds}s ${milliSeconds}ms`;
      }
    }
    return '';
  }

}
