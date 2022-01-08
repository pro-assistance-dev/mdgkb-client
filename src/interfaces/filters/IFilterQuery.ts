import IFilterModel from '@/interfaces/filters/IFilterModel';
import ISortModel from '@/interfaces/filters/ISortModel';

export default interface IFilterQuery {
  id?: string;
  offset: number;
  filterModels: IFilterModel[];
  sortModels: ISortModel[];
  withDeleted: boolean;

  toUrl: () => string;
}
