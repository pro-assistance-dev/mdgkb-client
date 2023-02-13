import FilterQuery from '@/classes/filters/FilterQuery';
import SortModel from '@/classes/filters/SortModel';

export interface State {
  trigger: string;
  filterQuery: FilterQuery;
  storeModule: string;
  action: string;
  sortModels: SortModel[];
  setDefaultSortModel: boolean;
}
