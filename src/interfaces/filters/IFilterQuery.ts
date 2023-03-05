import { LocationQuery } from 'vue-router';

import IFilterModel from '@/interfaces/filters/IFilterModel';
import ISortModel from '@/interfaces/filters/ISortModel';
import IPagination from '@/interfaces/IPagination';
import SortModel from '@/services/classes/SortModel';

export default interface IFilterQuery {
  id?: string;
  col: string;
  value: string;
  filterModels: IFilterModel[];
  pagination: IPagination;
  sortModels: SortModel[];
  withDeleted: boolean;
  allLoaded: boolean;

  toUrl: () => string;
  toUrlQuery: () => string;
  fromUrlQuery: (obj: LocationQuery) => void;
  setAllLoaded: (loadedItemsLength: number) => void;
  resetAllLoaded: () => void;
  setParams: (col: string, value: string) => void;
  setCursorPagination: (schema: unknown, object: Record<string, unknown>) => void;
}
