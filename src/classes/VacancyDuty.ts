import IVacancyDuty from '@/interfaces/IVacancyDuty';

export default class VacancyDuty implements IVacancyDuty {
  id?;
  name = '';
  vacancyId?: string;
  order = 0;

  constructor(i?: IVacancyDuty) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.order = i.order;
    this.vacancyId = i.vacancyId;
  }
}
