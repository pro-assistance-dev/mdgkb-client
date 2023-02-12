import ClassHelper from '@/services/ClassHelper';

export default class ResidencyCoursePracticePlace {
  id?: string;
  name = '';
  link = '';
  order = 0;

  constructor(i?: ResidencyCoursePracticePlace) {
    ClassHelper.BuildClass(this, i);
  }
}
