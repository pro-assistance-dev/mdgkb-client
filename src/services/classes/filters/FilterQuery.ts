import { LocationQuery } from 'vue-router';

import FilterModel from '@/services/classes/filters/FilterModel';
import Pagination from '@/services/classes/filters/Pagination';
import { Operators } from '@/services/interfaces/Operators';

import SortModel from '../SortModel';

export default class FilterQuery {
  id?: string;
  col = '';
  value = '';
  filterModels: FilterModel[] = [];
  sortModels: SortModel[] = [];
  sortModel: SortModel | undefined;
  pagination: Pagination = new Pagination();
  withDeleted = false;

  f: FilterModel[] = [];
  s: SortModel[] = [];
  p: Pagination = new Pagination();

  static Create(filters: FilterModel[], sortModels: SortModel[], pagination?: Pagination): FilterQuery {
    const item = new FilterQuery();
    item.filterModels = filters;
    item.sortModels = sortModels;
    if (pagination) {
      item.pagination = pagination;
    }
    return item;
  }

  setQid(qid: string) {
    this.id = qid;
  }

  toFTSP(): void {
    this.f = this.filterModels;
    this.s = this.sortModels;
    this.p = this.pagination;
  }

  toUrl(): string {
    const filterModels = this.filterModels?.map((filterModel: FilterModel) => {
      return `filterModel={${filterModel.toUrlQuery()}}`;
    });
    const sortModels = this.sortModels.map((sortModels: SortModel) => {
      return `sortModel={${sortModels.toUrlQuery()}}`;
    });
    if (this.sortModel) {
      sortModels.push(`sortModel={${this.sortModel.toUrlQuery()}}`);
    }
    const pagination = `pagination={${this.pagination.toUrlQuery()}}`;

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

  setParams(col: unknown, value: string): void {
    this.col = (col as string) ?? '';
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

  setFilterModel(filterModel: FilterModel) {
    filterModel.isSet = true;
    let item = this.filterModels.find((i: FilterModel) => i.id === filterModel.id);
    if (item) {
      item = filterModel;
    } else {
      this.filterModels.push(filterModel);
    }
  }

  spliceFilterModel(id: string | undefined) {
    const index = this.filterModels.findIndex((i: FilterModel) => i.id === id);
    if (index > -1) {
      this.filterModels.splice(index, 1);
    }
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
