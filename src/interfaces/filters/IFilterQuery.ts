import IFilterModel from '@/interfaces/filters/IFilterModel';
import ISortModel from '@/interfaces/filters/ISortModel';
import IPagination from '@/interfaces/IPagination';

export default interface IFilterQuery {
  id?: string;
  limit: number;
  offset: number;
  main: boolean;
  filterModels: IFilterModel[];
  pagination: IPagination;
  sortModels: ISortModel[];
  withDeleted: boolean;

  toUrl: () => string;
}
