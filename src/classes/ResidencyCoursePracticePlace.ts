import ClassHelper from '@/services/ClassHelper';

import Division from './Division';
import ResidencyCoursePracticePlaceGroup from './ResidencyCoursePracticePlaceGroup';

export default class ResidencyCoursePracticePlace {
  id?: string;
  name = '';
  link = '';
  order = 0;
  division?: Division = new Division();
  divisionId?: string;
  residencyCoursePracticePlaceGroup?: ResidencyCoursePracticePlaceGroup = new ResidencyCoursePracticePlaceGroup();
  residencyCoursePracticePlaceGroupId?: string;

  constructor(i?: ResidencyCoursePracticePlace) {
    ClassHelper.BuildClass(this, i);
  }
}
