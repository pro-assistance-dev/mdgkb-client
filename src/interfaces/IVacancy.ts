import Division from '@/classes/Division';
import IVacancyDuty from '@/interfaces/IVacancyDuty';
import IVacancyRequirement from '@/interfaces/IVacancyRequirement';
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';
import ContactInfo from '@/services/classes/ContactInfo';

import IForm from './IForm';

export default interface IVacancy {
  id?: string;
  title: string;
  slug: string;
  contactInfo: ContactInfo;
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

  division?: Division;
  divisionId?: string;

  getSalary: () => string;
  addRequirement: () => void;
  addDuty: () => void;
}
