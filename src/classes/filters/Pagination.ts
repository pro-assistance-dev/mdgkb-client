import { LocationQuery } from 'vue-router';

import Cursor from '@/classes/filters/Cursor';
import { Operators } from '@/interfaces/filters/Operators';
import { Orders } from '@/interfaces/filters/Orders';

export default class Pagination {
  offset = 0;
  limit = 25;
  cursor: Cursor = new Cursor();
  cursorMode = false;
  append = false;

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
    return;
  }

  setOffset(itemsLen: number): void {
    this.offset = itemsLen;
  }

  toUrlQuery(): string {
    // console.log('FROM');
    let url = '';
    Object.keys(this).forEach((el, i) => {
      const value: any = this[el as keyof typeof this];
      const isObj = typeof this[el as keyof typeof this] == 'object';
      // console.log(value, el);
      if (value && url !== '?' && !isObj) {
        if (i !== 0) {
          url += '&';
        }
        url += `${el}=${value}`;
      }
    });
    // url += this.cursor.toUrlQuery();
    url += '|';
    return url;
  }

  fromUrlQuery(obj: LocationQuery): void {
    const str = window.location.search;
    const sormModelString = str.substring(str.indexOf('p=') + 2, str.lastIndexOf('|'));
    const params = new URLSearchParams(decodeURIComponent(sormModelString));
    this.offset = Number(params.get('offset'));
    this.limit = Number(params.get('col'));
  }
}
