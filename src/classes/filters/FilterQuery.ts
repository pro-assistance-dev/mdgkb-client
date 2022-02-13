import Pagination from '@/classes/filters/Pagination';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ISortModel from '@/interfaces/filters/ISortModel';
import IPagination from '@/interfaces/IPagination';

export default class FilterQuery implements IFilterQuery {
  id?: string;
  filterModels: IFilterModel[] = [];
  sortModels: ISortModel[] = [];
  pagination: IPagination = new Pagination();
  withDeleted = false;
  offset = 0;
  limit = 0;
  main = false;
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
    const main = `main=${this.main}`;
    let url = `?${[...filterModels, ...sortModels, withDeleted, main, pagination].join('&')}`;
    if (this.id) {
      url = `${this.id}${url}`;
    }
    return url;
  }
}
