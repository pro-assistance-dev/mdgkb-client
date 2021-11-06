import IDivision from '@/interfaces/buildings/IDivision';
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';

export default interface IVacancy {
  id?: string;
  title: string;
  description: string;
  specialization: string;
  salary: string;
  archived: boolean;
  requirements: string;
  experience: string;
  duties: string;
  schedule: string;

  vacancyResponses: IVacancyResponse[];
  withNewResponses: () => boolean;
  seeAllResponses: () => void;
  countResponses: (onlyNew: boolean) => number;

  division?: IDivision;
  divisionId?: string;
}
