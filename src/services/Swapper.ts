export {};

declare global {
  interface Array<T> {
    swap(a: number, b: number): void;
  }
}

Array.prototype.swap = function (a: number, b: number) {
  if (a < 0 || a >= this.length || b < 0 || b >= this.length) {
    return;
  }
  const temp = this[a];
  this[a] = this[b];
  this[b] = temp;
};
