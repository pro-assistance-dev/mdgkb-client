import IOrdered from '@/services/interfaces/IOrdered';

export function moveUp(items: IOrdered[], index: number): void {
  items[index].order = index - 1;
  if (items[index - 1]) {
    items[index - 1].order = index;
  }
  [items[index], items[index - 1]] = [items[index - 1], items[index]];
}

export function moveDown(items: IOrdered[], index: number): void {
  items[index].order = index + 1;
  if (items[index + 1]) {
    items[index + 1].order = index;
  }
  [items[index], items[index + 1]] = [items[index + 1], items[index]];
}
