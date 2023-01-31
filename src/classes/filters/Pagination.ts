import { LocationQuery } from 'vue-router';

import Cursor from '@/classes/filters/Cursor';
import { Operators } from '@/interfaces/filters/Operators';
import ICursor from '@/interfaces/ICursor';
import IPagination from '@/interfaces/IPagination';

export default class Pagination implements IPagination {
  cursor: ICursor = new Cursor();
  cursorMode = false;
  append = false;
  offset = 0;
  limit = 25;

  setLoadMore(lastCursor: string, column: string, table: string): void {
    this.cursor.value = lastCursor;
    this.cursor.initial = false;
    this.cursor.operation = Operators.Gt;
    this.cursor.column = column;
    this.cursor.tableName = table;
    this.cursorMode = true;
    return;
  }

  setOffset(itemsLen: number): void {
    this.offset = itemsLen;
  }

  toUrlQuery(): string {
    let url = '';
    Object.keys(this).forEach((el, i) => {
      const value: any = this[el as keyof typeof this];
      const isObj = typeof this[el as keyof typeof this] == 'object';
      if (value && url !== '?' && !isObj) {
        if (i !== 0) {
          url += '&';
        }
        url += `pag${el}=${value}`;
      }
    });
    url += this.cursor.toUrlQuery();
    return url;
  }

  fromUrlQuery(obj: LocationQuery): void {
    this.cursor.fromUrlQuery(obj);
    if (obj.pagoffset) {
      this.offset = Number(obj.pagoffset);
    }
    if (obj.paglimit) {
      this.limit = Number(obj.paglimit);
    }
    if (obj.pagcursorMode !== undefined) {
      this.cursorMode = Boolean(obj.pagcursorMode);
    }
    if (obj.pagappend !== undefined) {
      this.append = Boolean(obj.pagappend);
    }
  }
}
