import IVacancyRequirement from '@/interfaces/IVacancyRequirement';

export default class VacancyRequirement implements IVacancyRequirement {
  id?;
  name = '';
  vacancyId?: string;

  constructor(i?: IVacancyRequirement) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.vacancyId = i.vacancyId;
  }
}
