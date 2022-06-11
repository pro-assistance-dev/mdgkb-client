import IVacancyResponse from './vacancyResponse/IVacancyResponse';

export default interface IVacancyResponsesWithCount {
  vacancyResponses: IVacancyResponse[];
  count: number;
}
