import ClassHelper from '@/services/ClassHelper';

export default class EducationYear {
  id?: string;
  year = new Date();
  active = false;

  constructor(i?: EducationYear) {
    ClassHelper.BuildClass(this, i);
  }
}
