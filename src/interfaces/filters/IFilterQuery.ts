import IFilterModel from '@/interfaces/filters/IFilterModel';
import ISortModel from '@/interfaces/filters/ISortModel';

export default interface IFilterQuery {
  id?: string;
  limit: number;
  offset: number;
  filterModels: IFilterModel[];
  sortModels: ISortModel[];
  withDeleted: boolean;

  toUrl: () => string;
}
