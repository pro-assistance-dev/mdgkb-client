import IVacancyDuty from '@/interfaces/IVacancyDuty';

export default class VacancyDuty implements IVacancyDuty {
  id?;
  name = '';
  vacancyId?: string;

  constructor(i?: IVacancyDuty) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.vacancyId = i.vacancyId;
  }
}
