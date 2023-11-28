import Vacancy from '@/classes/Vacancy';

export default interface IVacanciesWithCount {
  vacancies: Vacancy[];
  count: number;
}
