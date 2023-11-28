import ClassHelper from '@/services/ClassHelper';

export default class VacancyRequirement {
  id?: string;
  name = '';
  vacancyId?: string;
  order = 0;

  constructor(i?: VacancyRequirement) {
    ClassHelper.BuildClass(this, i);
  }
}
