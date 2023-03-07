import { LocationQuery } from 'vue-router';

import IFilterModel from '@/services/interfaces/IFilterModel';
import ISortModel from '@/services/interfaces/ISortModel';
import IPagination from '@/services/interfaces/IPagination';
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
