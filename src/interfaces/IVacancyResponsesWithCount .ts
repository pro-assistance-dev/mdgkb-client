import VacancyResponse from '@/classes/VacancyResponse';

export default interface VacancyResponsesWithCount {
  vacancyResponses: VacancyResponse[];
  count: number;
}
