import IDivision from '@/interfaces/buildings/IDivision';
import IContactInfo from '@/interfaces/contacts/IContactInfo';
import IVacancyDuty from '@/interfaces/IVacancyDuty';
import IVacancyRequirement from '@/interfaces/IVacancyRequirement';
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';

export default interface IVacancy {
  id?: string;
  title: string;
  slug: string;
  contactInfo: IContactInfo;
  contactInfoId?: string;
  specialization: string;
  minSalary: number;
  maxSalary: number;
  salaryComment: string;
  archived: boolean;
  experience: string;
  vacancyDuties: IVacancyDuty[];
  vacancyRequirements: IVacancyRequirement[];
  schedule: string;
  date: Date;

  vacancyResponses: IVacancyResponse[];
  withNewResponses: () => boolean;
  seeAllResponses: () => void;
  countResponses: (onlyNew: boolean) => number;

  division?: IDivision;
  divisionId?: string;

  getSalary: () => string;
}
