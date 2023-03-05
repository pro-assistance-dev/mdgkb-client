import { LocationQuery } from 'vue-router';

import FilterModel from '@/classes/filters/FilterModel';
import Pagination from '@/classes/filters/Pagination';
import { Operators } from '@/interfaces/filters/Operators';

import SortModel from '../../services/classes/SortModel';

export default class FilterQuery {
  id?: string;
  col = '';
  value = '';
  filterModels: FilterModel[] = [];
  sortModels: SortModel[] = [];
  sortModel: SortModel | undefined;
  pagination: Pagination = new Pagination();
  withDeleted = false;

  toUrl(): string {
    const filterModels = this.filterModels?.map((filterModel: FilterModel) => {
      return `filterModel=${JSON.stringify(filterModel)}`;
    });
    const sortModels = this.sortModels.map((sortModels: SortModel) => {
      return `sortModel=${JSON.stringify(sortModels)}`;
    });
    if (this.sortModel) {
      sortModels.push(`sortModel=${JSON.stringify(this.sortModel)}`);
    }
    const pagination = `pagination=${JSON.stringify(this.pagination)}`;

    const withDeleted = `withDeleted=${this.withDeleted}`;
    const all = [...filterModels, ...sortModels, withDeleted, pagination];
    if (this.col) {
      all.push(`col=${this.col}`);
    }
    if (this.value) {
      all.push(`value=${this.value}`);
    }
    let url = `?${all.join('&')}`;
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
        filterModelsUrlQuery += ',';
      }
      filterModelsUrlQuery += fm.toUrlQuery();
    });
    url += filterModelsUrlQuery;
    return url;
  }

  async fromUrlQuery(obj: LocationQuery): Promise<void> {
    this.pagination.fromUrlQuery(obj);
    if (!this.pagination.limit || !this.pagination.offset) {
      this.pagination.limit = 25;
    }

    const sortModel = new SortModel();
    await sortModel.fromUrlQuery(obj);
    if (sortModel.model) {
      this.setSortModel(sortModel);
    }

    const str = window.location.search;
    const filterModels = str.substring(str.indexOf('f=') + 2, str.lastIndexOf('|'));
    const modelsStrings = filterModels.split(',');
    const params = modelsStrings.map((m) => new URLSearchParams(decodeURIComponent(m)));

    params.forEach((p: URLSearchParams) => {
      const fm = new FilterModel();
      fm.fromUrlQuery(p);
      if (fm.col) {
        this.filterModels.push(fm);
      }
    });
  }

  setParams(col: string, value: string): void {
    this.col = col;
    this.value = value;
  }

  setCursorPagination(schema: unknown, object: Record<string, unknown>): void {
    const s = schema as Record<string, unknown>;
    // const sortModel = this.sortModels.find((s: SortModel) => s.id);
    if (!this.sortModel) {
      return;
    }
    for (const p in s) {
      if (s[p] === this.sortModel.col) {
        if (p === 'sortColumn') {
          continue;
        }
        this.pagination.cursor.column = this.sortModel.col;
        this.pagination.cursor.value = String(object[p]);
        this.pagination.cursor.operation = this.sortModel.isAsc() ? Operators.Gt : Operators.Lt;
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

  findFilterModel(m: FilterModel): FilterModel | undefined {
    return this.filterModels.find((f: FilterModel) => {
      if (f.model === m.model && f.label === m.label && f.col === m.col && f.operator === m.operator) {
        if (f.value1 === m.value1 || f.boolean === m.boolean) {
          return true;
        }
      }
    });
  }

  reset(): void {
    this.filterModels.forEach((filterModel: FilterModel) => {
      filterModel.isSet = false;
      filterModel.value1 = '';
      filterModel.date1 = undefined;
      filterModel.date2 = undefined;
      filterModel.boolean = false;
      filterModel.set = [];
    });
    this.pagination = new Pagination();
    this.filterModels = [];
    this.sortModels = [];
    this.sortModel = undefined;
  }
}
