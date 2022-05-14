import IVacancyRequirement from '@/interfaces/IVacancyRequirement';

export default class VacancyRequirement implements IVacancyRequirement {
  id?;
  name = '';
  vacancyId?: string;
  order = 0;
  constructor(i?: IVacancyRequirement) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.order = i.order;
    this.vacancyId = i.vacancyId;
  }
}
