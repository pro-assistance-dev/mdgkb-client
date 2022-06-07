import IVacancy from '@/interfaces/IVacancy';

export interface State {
  vacancies: IVacancy[];
  vacancy: IVacancy;
  count: number;
}
