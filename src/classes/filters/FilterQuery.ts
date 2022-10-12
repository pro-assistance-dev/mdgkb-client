import Pagination from '@/classes/filters/Pagination';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Operators } from '@/interfaces/filters/Operators';
import IPagination from '@/interfaces/IPagination';

export default class FilterQuery implements IFilterQuery {
  id?: string;
  col = '';
  value = '';
  filterModels: IFilterModel[] = [];
  sortModels: ISortModel[] = [];
  pagination: IPagination = new Pagination();
  withDeleted = false;
  offset = 0;
  limit = 0;
  allLoaded = false;

  toUrl(): string {
    // const offset = `offset=${this.pagination.offset}`;
    // const limit = `limit=${this.pagination.limit}`;
    const filterModels = this.filterModels?.map((filterModel: IFilterModel) => {
      return `filterModel=${JSON.stringify(filterModel)}`;
    });
    const sortModels = this.sortModels.map((sortModels: ISortModel) => {
      return `sortModel=${JSON.stringify(sortModels)}`;
    });

    const pagination = `pagination=${JSON.stringify(this.pagination)}`;
    // const cursor = `operator=${JSON.stringify(this.pagination)}`;

    const withDeleted = `withDeleted=${this.withDeleted}`;
    const col = `col=${this.col}`;
    const value = `value=${this.value}`;
    let url = `?${[...filterModels, ...sortModels, withDeleted, pagination, col, value].join('&')}`;
    if (this.id) {
      url = `${this.id}${url}`;
    }
    return url;
  }

  setAllLoaded(loadedItemsLength: number): void {
    this.allLoaded = !(loadedItemsLength >= this.pagination.limit);
  }
  resetAllLoaded(): void {
    this.allLoaded = false;
  }

  setParams(col: string, value: string): void {
    this.col = col;
    this.value = value;
  }

  setCursorPagination(schema: unknown, object: Record<string, unknown>): void {
    const s = schema as Record<string, unknown>;
    const sortModel = this.sortModels.find((s: ISortModel) => s.id);
    if (!sortModel) {
      return;
    }
    for (const p in s) {
      if (s[p] === sortModel.col) {
        if (p === 'sortColumn') {
          continue;
        }
        this.pagination.cursor.column = sortModel.col;
        this.pagination.cursor.value = String(object[p]);
        this.pagination.cursor.operation = sortModel.isAsc() ? Operators.Gt : Operators.Lt;
        this.pagination.cursorMode = true;
        this.pagination.cursor.initial = false;
        break;
      }
    }
  }
}
