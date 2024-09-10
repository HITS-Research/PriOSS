// ES2023 - Polyfill (https://www.w3schools.com/JS/js_2023.asp)

if (!Array.prototype.findLastIndex) {
  Array.prototype.findLastIndex = function (
    predicate: (value: any, index: number, array: any[]) => unknown,
    thisArg?: any,
  ): number {
    if (thisArg) predicate.bind(thisArg);
    for (let i = this.length - 1; i >= 0; i--)
      if (predicate(this[i], i, this)) return i;
    return -1;
  };
}

if (!Array.prototype.findLast) {
  Array.prototype.findLast = function <S>(
    predicate: (value: any, index: number, array: any[]) => value is S,
    thisArg?: any,
  ): S | undefined {
    return this.at(this.findLastIndex(predicate, thisArg));
  };
}

if (!Array.prototype.toSpliced) {
  Array.prototype.toSpliced = function <T>(
    start: number,
    deleteCount: number,
    ...items: T[]
  ): T[] {
    const data = [...this];
    data.splice(start, deleteCount, items);
    return data;
  };
}

if (!Array.prototype.toSorted) {
  Array.prototype.toSorted = function <T>(
    compareFn?: ((a: T, b: T) => number) | undefined,
  ): T[] {
    return [...this].sort(compareFn);
  };
}

if (!Array.prototype.toReversed) {
  Array.prototype.toReversed = function <T>(): T[] {
    return [...this].reverse();
  };
}

if (!Array.prototype.with) {
  Array.prototype.with = function <T>(index: number, value: T): T[] {
    return this.toSpliced(index, 1, value);
  };
}
