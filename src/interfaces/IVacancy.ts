import IDivision from '@/interfaces/buildings/IDivision';
import IContactInfo from '@/interfaces/contacts/IContactInfo';
import IVacancyDuty from '@/interfaces/IVacancyDuty';
import IVacancyRequirement from '@/interfaces/IVacancyRequirement';
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';

import IForm from './IForm';

export default interface IVacancy {
  id?: string;
  title: string;
  slug: string;
  contactInfo: IContactInfo;
  contactInfoId?: string;
  specialization: string;
  minSalary: number;
  responsesCount: number;
  newResponsesCount: number;
  maxSalary: number;
  salaryComment: string;
  active: boolean;
  experience: string;
  vacancyDuties: IVacancyDuty[];
  vacancyDutiesForDelete: string[];
  vacancyRequirements: IVacancyRequirement[];
  vacancyRequirementsForDelete: string[];
  schedule: string;
  date: Date;
  formPattern: IForm;
  formPatternId?: string;

  vacancyResponses: IVacancyResponse[];
  vacancyResponsesForDelete: string[];
  withNewResponses: () => boolean;
  countResponses: (onlyNew?: boolean) => number;

  division?: IDivision;
  divisionId?: string;

  getSalary: () => string;
  addRequirement: () => void;
  addDuty: () => void;
}
