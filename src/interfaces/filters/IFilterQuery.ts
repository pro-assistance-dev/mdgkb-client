import IFilterModel from '@/interfaces/filters/IFilterModel';
import ISortModel from '@/interfaces/filters/ISortModel';
import IPagination from '@/interfaces/IPagination';

export default interface IFilterQuery {
  id?: string;
  col: string;
  value: string;
  filterModels: IFilterModel[];
  pagination: IPagination;
  sortModels: ISortModel[];
  withDeleted: boolean;
  allLoaded: boolean;

  toUrl: () => string;
  setAllLoaded: (loadedItemsLength: number) => void;
  setParams: (col: string, value: string) => void;
}
