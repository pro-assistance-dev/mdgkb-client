import Cursor from '@/classes/filters/Cursor';
import ICursor from '@/interfaces/ICursor';
import IPagination from '@/interfaces/IPagination';

export default class Pagination implements IPagination {
  cursor: ICursor = new Cursor();
  cursorMode = true;
  offset = 0;
  limit = 25;
}
