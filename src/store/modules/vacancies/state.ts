import IVacancy from '@/interfaces/IVacancy';

export interface State {
  items: IVacancy[];
  item: IVacancy;
  count: number;
}
