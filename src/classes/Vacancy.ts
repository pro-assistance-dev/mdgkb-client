import Division from '@/classes/Division';
import VacancyDuty from '@/classes/VacancyDuty';
import VacancyRequirement from '@/classes/VacancyRequirement';
import VacancyResponse from '@/classes/VacancyResponse';
import IForm from '@/interfaces/IForm';
import IVacancy from '@/interfaces/IVacancy';
import IVacancyDuty from '@/interfaces/IVacancyDuty';
import IVacancyRequirement from '@/interfaces/IVacancyRequirement';
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';
import ContactInfo from '@/services/classes/ContactInfo';
import ClassHelper from '@/services/ClassHelper';

import Form from './Form';

export default class Vacancy implements IVacancy {
  id?: string;
  title = '';
  slug = '';
  contactInfo: ContactInfo = new ContactInfo();
  contactInfoId?: string;
  specialization = '';
  salaryComment = '';
  minSalary = 0;
  maxSalary = 0;
  active = false;
  responsesCount = 0;
  newResponsesCount = 0;
  @ClassHelper.GetClassConstructor(VacancyResponse)
  vacancyResponses: VacancyResponse[] = [];
  vacancyResponsesForDelete = [];
  experience = '';
  @ClassHelper.GetClassConstructor(VacancyDuty)
  vacancyDuties: IVacancyDuty[] = [];
  vacancyDutiesForDelete = [];
  @ClassHelper.GetClassConstructor(VacancyRequirement)
  vacancyRequirements: IVacancyRequirement[] = [];
  vacancyRequirementsForDelete = [];
  schedule = '';
  division?: Division;
  divisionId?: string;
  date: Date = new Date();
  formPattern: IForm = new Form();
  formPatternId?: string;

  constructor(i?: IVacancy) {
    ClassHelper.BuildClass(this, i);
  }

  withNewResponses(): boolean {
    return this.vacancyResponses.some((vacancyResponse: IVacancyResponse) => vacancyResponse.formValue.isNew);
  }

  countResponses(onlyNew?: boolean): number {
    if (!onlyNew) {
      return this.vacancyResponses.length;
    }
    return this.vacancyResponses.filter((response: IVacancyResponse) => response.formValue.isNew).length;
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
