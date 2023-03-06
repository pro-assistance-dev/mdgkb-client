import ClassHelper from '@/services/ClassHelper';

export default class EducationSpeciality {
  id?: string;
  name = '';

  constructor(i?: EducationSpeciality) {
    ClassHelper.BuildClass(this, i);
  }
}
