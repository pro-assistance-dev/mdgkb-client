import SortModel from '@/classes/filters/SortModel';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';

export interface State {
  trigger: string;
  filterQuery: IFilterQuery;
  storeModule: string;
  action: string;
  sortModels: SortModel[];
  setDefaultSortModel: boolean;
}
