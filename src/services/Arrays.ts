import IOrdered from '@/services/interfaces/IOrdered';

import IWithId from './interfaces/IWithId';

export type Constructable<T> = { new (...args: any[]): T };

export default abstract class Arrays {
  static Shuffle<ArrayType>(array: ArrayType[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  static GenerateNumsRange(start: number, stop: number, step = 1) {
    return Array.from({ length: (stop - start) / step + 1 }, (_, index) => start + index * step);
  }

  static GetLast<ArrayType>(arr: ArrayType[]): ArrayType {
    return arr[arr.length - 1];
  }

  static GetFirst<ArrayType>(arr: ArrayType[]): ArrayType {
    return arr[0];
  }

  static GetRandEL<ArrayType>(arr: ArrayType[]): ArrayType {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  static Sort(ordered: IOrdered[]): void {
    ordered.forEach((o: IOrdered, i: number) => (o.order = i));
  }

  static Refill<T>(arr: T[], refilled: T[]): void {
    arr.splice(0, arr.length);
    arr.push(...refilled);
  }

  static Eq<ArrayType>(arr1: ArrayType[], arr2: ArrayType[]): boolean {
    return arr1.length === arr2.length && arr1?.every((_: ArrayType, i: number) => arr1[i] == arr2[i]);
  }

  static SwipeById(arr: IWithId[], el1: IWithId, el2: IWithId): void {
    const el1Index = arr.findIndex((el: IWithId) => el1.id === el.id);
    const el2Index = arr.findIndex((el: IWithId) => el2.id === el.id);
    if (el1Index || el2Index) {
      return;
    }
    [arr[el1Index], arr[el2Index]] = [arr[el2Index], arr[el1Index]];
  }

  static Swap(arr: IWithId[], a: number, b: number) {
    if (a < 0 || a >= arr.length || b < 0 || b >= arr.length) {
      return;
    }
    const temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  }
}
