import IFilterQuery from '@/interfaces/filters/IFilterQuery';

export interface State {
  trigger: string;
  filterQuery: IFilterQuery;
  storeModule: string;
  action: string;
}
