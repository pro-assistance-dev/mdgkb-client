import IVacancy from '@/interfaces/vacancies/IVacancy';

export interface State {
  vacancies: IVacancy[];
  vacancy: IVacancy;
}
