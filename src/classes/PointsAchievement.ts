import ClassHelper from '@/services/ClassHelper';

export default class PointsAchievement {
  id?: string;
  name = '';
  points = 0;
  code = '';
  order = 0;
  constructor(i?: PointsAchievement) {
    ClassHelper.BuildClass(this, i);
  }
}
