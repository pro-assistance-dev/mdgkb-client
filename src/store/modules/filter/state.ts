import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ISortModel from '@/interfaces/filters/ISortModel';

export interface State {
  trigger: string;
  filterQuery: IFilterQuery;
  storeModule: string;
  action: string;
  sortModels: ISortModel[];
  setDefaultSortModel: boolean;
}
