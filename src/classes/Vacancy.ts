import Division from '@/classes/buildings/Division';
import ContactInfo from '@/classes/contacts/ContactInfo';
import VacancyDuty from '@/classes/VacancyDuty';
import VacancyRequirement from '@/classes/VacancyRequirement';
import VacancyResponse from '@/classes/VacancyResponse';
import IDivision from '@/interfaces/buildings/IDivision';
import IContactInfo from '@/interfaces/contacts/IContactInfo';
import IForm from '@/interfaces/IForm';
import IVacancy from '@/interfaces/IVacancy';
import IVacancyDuty from '@/interfaces/IVacancyDuty';
import IVacancyRequirement from '@/interfaces/IVacancyRequirement';
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';

import Form from './Form';

export default class Vacancy implements IVacancy {
  id?;
  title = '';
  slug = '';
  contactInfo: IContactInfo = new ContactInfo();
  contactInfoId?: string;
  specialization = '';
  salaryComment = '';
  minSalary = 0;
  maxSalary = 0;
  active = false;
  responsesCount = 0;
  newResponsesCount = 0;

  vacancyResponses: IVacancyResponse[] = [];
  experience = '';
  vacancyDuties: IVacancyDuty[] = [];
  vacancyDutiesForDelete = [];
  vacancyRequirements: IVacancyRequirement[] = [];
  vacancyRequirementsForDelete = [];
  schedule = '';
  division?: IDivision;
  divisionId?: string;
  date: Date = new Date();
  formPattern: IForm = new Form();
  formPatternId?: string;

  constructor(i?: IVacancy) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.slug = i.slug;
    this.title = i.title;
    this.responsesCount = i.responsesCount;
    this.newResponsesCount = i.newResponsesCount;
    if (i.contactInfo) {
      this.contactInfo = new ContactInfo(i.contactInfo);
    }
    this.contactInfoId = i.contactInfoId;
    this.specialization = i.specialization;
    this.minSalary = i.minSalary;
    this.maxSalary = i.maxSalary;
    this.salaryComment = i.salaryComment;
    this.active = i.active;
    this.experience = i.experience;
    this.schedule = i.schedule;
    this.date = i.date;
    this.formPatternId = i.formPatternId;

    if (i.vacancyResponses) {
      this.vacancyResponses = i.vacancyResponses.map((response: IVacancyResponse) => new VacancyResponse(response));
    }
    if (i.division) {
      this.division = new Division(i.division);
    }
    if (i.vacancyDuties) {
      this.vacancyDuties = i.vacancyDuties.map((item: IVacancyDuty) => new VacancyDuty(item));
    }
    if (i.vacancyRequirements) {
      this.vacancyRequirements = i.vacancyRequirements.map((item: IVacancyRequirement) => new VacancyRequirement(item));
    }
    if (i.formPattern) {
      this.formPattern = new Form(i.formPattern);
    }
    this.divisionId = i.divisionId;
  }

  seeAllResponses(): void {
    this.vacancyResponses.forEach((vacancyResponse: IVacancyResponse) => (vacancyResponse.viewed = true));
  }

  withNewResponses(): boolean {
    return this.vacancyResponses.some((vacancyResponse: IVacancyResponse) => !vacancyResponse.viewed);
  }

  countResponses(onlyNew: boolean): number {
    if (!onlyNew) {
      return this.vacancyResponses.length;
    }
    return this.vacancyResponses.filter((response: IVacancyResponse) => !response.viewed).length;
  }

  getSalary(): string {
    if (this.maxSalary > 0) {
      return `От ${this.minSalary} руб. до ${this.maxSalary} руб.`;
    }
    return `${this.minSalary} руб.`;
  }

  addDuty(): void {
    this.vacancyDuties.push(new VacancyDuty());
  }

  addRequirement(): void {
    this.vacancyRequirements.push(new VacancyRequirement());
  }
}
