import PointsAchievement from '@/classes/PointsAchievement';
import ResidencyApplication from '@/classes/ResidencyApplication';
import FileInfo from '@/services/classes/FileInfo';
import ClassHelper from '@/services/ClassHelper';

export default class ResidencyApplicationPointsAchievement {
  id?: string;
  residencyApplication: ResidencyApplication = new ResidencyApplication();
  residencyApplicationId?: string;
  @ClassHelper.GetClassConstructor(PointsAchievement)
  pointsAchievement: PointsAchievement = new PointsAchievement();
  pointsAchievementId?: string;
  fileInfoId?: string;
  fileInfo: FileInfo = new FileInfo();
  approved = false;
  showError = false;

  constructor(i?: ResidencyApplicationPointsAchievement) {
    ClassHelper.BuildClass(this, i);
  }
}
