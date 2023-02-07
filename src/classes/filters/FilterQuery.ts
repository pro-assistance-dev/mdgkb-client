import { LocationQuery } from 'vue-router';

import FilterModel from '@/classes/filters/FilterModel';
import Pagination from '@/classes/filters/Pagination';
import { Operators } from '@/interfaces/filters/Operators';

import SortModel from './SortModel';

export default class FilterQuery {
  id?: string;
  col = '';
  value = '';
  filterModels: FilterModel[] = [];
  sortModels: SortModel[] = [];
  sortModel: SortModel | undefined;
  pagination: Pagination = new Pagination();
  withDeleted = false;
  allLoaded = false;

  toUrl(): string {
    // const offset = `offset=${this.pagination.offset}`;
    // const limit = `limit=${this.pagination.limit}`;
    const filterModels = this.filterModels?.map((filterModel: FilterModel) => {
      return `filterModel=${JSON.stringify(filterModel)}`;
    });
    const sortModels = this.sortModels.map((sortModels: SortModel) => {
      return `sortModel=${JSON.stringify(sortModels)}`;
    });
    sortModels.push(`sortModel=${JSON.stringify(this.sortModel)}`);
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

  toUrlQuery(): string {
    let url = '';

    url += 's=';
    url += this.sortModel?.toUrlQuery();

    url += 'p=';
    url += this.pagination.toUrlQuery();

    let filterModelsUrlQuery = 'f=';
    this.filterModels.forEach((fm, i) => {
      if (i !== 0) {
        filterModelsUrlQuery += '&';
      }
      filterModelsUrlQuery += fm.toUrlQuery();
    });
    console.log(filterModelsUrlQuery);
    url += filterModelsUrlQuery;
    return url;
  }

  async fromUrlQuery(obj: LocationQuery): Promise<void> {
    // Bugged
    this.pagination.fromUrlQuery(obj);
    if (!this.pagination.limit || !this.pagination.offset) {
      this.pagination.limit = 25;
    }
    // ----------
    // Fore one sortModel. Bugged too
    const sortModel = new SortModel();
    await sortModel.fromUrlQuery(obj);
    if (sortModel.model) {
      this.setSortModel(sortModel);
    }

    // this.sortModel = sortModel;
    // this.sortModels = [sortModel];
    // ----------
    // if (obj.value) {
    //   this.value = String(obj.value);
    // }
    // if (obj.col) {
    //   this.col = String(obj.col);
    // }
    // if (obj.withDeleted !== undefined) {
    //   this.withDeleted = Boolean(obj.withDeleted);
    // }
    // if (obj.offset) {
    //   this.offset = Number(obj.offset);
    // }
    // if (obj.limit) {
    //   this.limit = Number(obj.limit);
    // }
    // if (obj.allLoaded !== undefined) {
    //   this.allLoaded = Boolean(obj.allLoaded);
    // }
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
    const sortModel = this.sortModels.find((s: SortModel) => s.id);
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

  setSortModel(sortModel: SortModel) {
    if (this.sortModel) {
      return;
    }
    this.sortModel = sortModel;
  }
}
