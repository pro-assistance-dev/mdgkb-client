import IPointsAchievement from '@/interfaces/IPointsAchievement';

export default class PointsAchievement implements IPointsAchievement {
  id?: string;
  name = '';
  points = 0;
  code = '';
  order = 0;
  constructor(i?: IPointsAchievement) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.points = i.points;
    this.code = i.code;
    this.order = i.order;
  }
}
