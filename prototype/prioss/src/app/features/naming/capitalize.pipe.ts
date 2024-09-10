import { Pipe, PipeTransform } from '@angular/core';

/**
 * Returns a capitalized string for a given string.
 *
 * e.g.
 * - `{{ 'helloWorld' | capitalize }}` = Hello World
 * - `{{ 'HelloWorld' | capitalize }}` = Hello World
 * - `{{ 'hello_world' | capitalize }}` = Hello World
 * - `{{ 'Hello_World' | capitalize }}` = Hello World
 * - `{{ 'Hello-World' | capitalize }}` = Hello- World
 * - `{{ 'hello-world' | capitalize }}` = Hello-world
 */
@Pipe({
  name: 'capitalize',
  standalone: true
})
export class CapitalizePipe implements PipeTransform {

  /**
   * Checks a string, if it is lowercase.
   * @param value A string which will be checkt for lowercase.
   * @returns true if lowercase, false otherwise.
   */
  isLowerCase(value: string) {
    return value !== value.toUpperCase() && value === value.toLowerCase();
  }

  /**
   * Checks a string, if it is uppercase.
   * @param value A string which will be checkt for uppercase.
   * @returns true if uppercase, false otherwise.
   */
  isUpperCase(value: string) {
    return value === value.toUpperCase() && value !== value.toLowerCase();
  }

  /**
   * Returns a capitalized string for a given string.
   * @param value The string which should be capitalized.
   * @param _args not used
   * @returns
  */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: string, ..._args: unknown[]): string {
    const trimedValue = value.trim();
    let newValue = trimedValue.charAt(0).toUpperCase();

    for (let i = 1; i < trimedValue.length; i++) {
      const char = trimedValue.charAt(i);
      const prev = trimedValue.charAt(i - 1);

      if (this.isUpperCase(char))
        newValue += prev === ' ' || prev === '_'
          ? char
          : ' ' + char;

      else if (char === '_')
        newValue += ' ';

      else
        newValue += prev === ' ' || prev === '_'
          ? char.toUpperCase()
          : char;
    }
    return newValue;
  }

}
