import IVisitsApplication from '@/interfaces/IVisitsApplication';

export interface State {
  items: IVisitsApplication[];
  item: IVisitsApplication;
  count: number;
}
