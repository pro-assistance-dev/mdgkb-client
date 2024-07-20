import PointsAchievement from '@/classes/PointsAchievement';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<PointsAchievement> {
  constructor() {
    super(PointsAchievement, 'points-achievements');
  }
}
const store: S = new S();
export default store;
