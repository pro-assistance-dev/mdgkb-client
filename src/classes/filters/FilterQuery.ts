import IFilterModel from '@/interfaces/filters/IFilterModel';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ISortModel from '@/interfaces/filters/ISortModel';

export default class FilterQuery implements IFilterQuery {
  id?: string;
  filterModels: IFilterModel[] = [];
  sortModels: ISortModel[] = [];
  withDeleted = false;
  offset = 0;
  limit = 0;
  main = false;

  toUrl(): string {
    const offset = `offset=${this.offset}`;
    const limit = `limit=${this.limit}`;
    const filterModels = this.filterModels.map((filterModel: IFilterModel) => {
      return `filterModel=${JSON.stringify(filterModel)}`;
    });
    const sortModels = this.sortModels.map((sortModels: ISortModel) => {
      return `sortModel=${JSON.stringify(sortModels)}`;
    });
    const withDeleted = `withDeleted=${this.withDeleted}`;
    const main = `main=${this.main}`;
    let url = `?${[offset, limit, ...filterModels, ...sortModels, withDeleted, main].join('&')}`;
    if (this.id) {
      url = `${this.id}${url}`;
    }
    return url;
  }
}
