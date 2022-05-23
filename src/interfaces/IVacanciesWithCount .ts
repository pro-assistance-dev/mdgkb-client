import IVacancy from './IVacancy';

export default interface IVacanciesWithCount {
  vacancies: IVacancy[];
  count: number;
}
