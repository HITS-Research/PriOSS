import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeSpecialCharacters',
  standalone: true,
})
export class RemoveSpecialCharactersPipe implements PipeTransform {
  transform(value: string, skipCharacters: string = ''): string {
    const escapedSkipCharacters = skipCharacters.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`[^\\w\\s${escapedSkipCharacters}]`, 'gi');
    return value.replace(regex, '').trim();
  }
}
