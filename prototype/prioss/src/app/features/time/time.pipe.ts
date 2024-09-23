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
   * Date Pipe does not support hours > 24 or hours > 12 format.
   * @param value The number which should be transformed
   * @param args The format, it should become.
   * @returns The formatted value.
   */
  transform(value: string | number, ...args: string[]): string {
    const pre = typeof value === 'string'
      ? parseFloat(value)
      : value;

    switch (args[0]) {
      case 'ms-to-hh:mm:ss': {
        let seconds: number | string = pre / 1000;
        const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
        seconds = seconds % 3600;
        const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
        seconds = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
      }
      case 'ms-to-mm:ss': {
        let seconds: number | string = pre / 1000;
        const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
        seconds = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
      }
      case 'ms-to-sec': {
        const seconds = Math.floor(pre / 1000);
        return `${seconds}s`;
      }
    }
    return '';
  }

}
