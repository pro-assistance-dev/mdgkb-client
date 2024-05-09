import { LocationQuery } from 'vue-router';

import FilterModel from '@/services/classes/filters/FilterModel';
import SortModel from '@/services/classes/SortModel';
import IPagination from '@/services/interfaces/IPagination';

export default interface IFilterQuery {
  id?: string;
  col: string;
  value: string;
  filterModels: FilterModel[];
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
