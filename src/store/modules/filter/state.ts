import FilterQuery from '@/services/classes/filters/FilterQuery';
import SortModel from '@/services/classes/SortModel';

export interface State {
  trigger: string;
  filterQuery: FilterQuery;
  storeModule: string;
  action: string;
  sortModels: SortModel[];
  setDefaultSortModel: boolean;
}
