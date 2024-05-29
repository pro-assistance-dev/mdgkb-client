import { LocationQuery } from 'vue-router';

import Cursor from '@/services/classes/filters/Cursor';
import ClassHelper from '@/services/ClassHelper';
import { Operators } from '@/services/interfaces/Operators';

export default class Pagination {
  offset = 0;
  limit = 25;
  cursor: Cursor = new Cursor();
  cursorMode = false;
  append = false;
  allLoaded = false;
  version = '';
  constructor(i?: Pagination) {
    ClassHelper.BuildClass(this, i);
  }
  setLoadMore(lastCursor: string, column: string, table: string): void {
    this.cursor.value = lastCursor;
    this.cursor.initial = false;
    this.cursor.operation = Operators.Gt;
    this.cursor.column = column;
    this.cursor.tableName = table;
    this.cursorMode = true;
    return;
  }

  setLoadMoreV2(lastCursor: string, column: string, model: string): void {
    this.cursor.value = lastCursor;
    this.cursor.initial = false;
    this.cursor.operation = Operators.Gt;
    this.cursor.column = column;
    this.cursor.model = model;
    this.cursorMode = true;
    this.version = 'v2';
    return;
  }

  setOffset(itemsLen: number): void {
    this.offset = itemsLen;
  }

  toUrlQuery(): string {
    const offset = `"offset":${this.offset}`;
    const limit = `"limit":${this.limit}`;
    const cursorMode = `"cursorMode":${this.cursorMode}`;
    const append = `"append":${this.append}`;
    const allLoaded = `"allLoaded":${this.allLoaded}`;
    const cursor = `"cursor":{${this.cursor.toUrlQuery()}}`;
    return [offset, limit, cursorMode, append, allLoaded, cursor].toString();
  }

  fromUrlQuery(obj: LocationQuery): void {
    const str = window.location.search;
    const sormModelString = str.substring(str.indexOf('p=') + 2, str.lastIndexOf('|'));
    const params = new URLSearchParams(decodeURIComponent(sormModelString));
    this.offset = Number(params.get('offset'));
    this.limit = Number(params.get('col'));
  }

  setAllLoaded(loadedItemsLength: number): void {
    this.allLoaded = !(loadedItemsLength >= this.limit);
  }
  resetAllLoaded(): void {
    this.allLoaded = false;
  }
  getPageNum(): number {
    return this.offset / this.limit + 1;
  }

  drop() {
    this.offset = 0;
    this.limit = 25;
    ClassHelper.BuildClass(this);
  }
}
