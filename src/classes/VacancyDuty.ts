import ClassHelper from '@/services/ClassHelper';

export default class VacancyDuty {
  id?: string;
  name = '';
  vacancyId?: string;
  order = 0;

  constructor(i?: VacancyDuty) {
    ClassHelper.BuildClass(this, i);
  }
}
