import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';

export interface State {
  items: IVacancyResponse[];
  item: IVacancyResponse;
  emailExists: boolean;
}
