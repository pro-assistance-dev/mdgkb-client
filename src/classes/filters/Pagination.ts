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
}
