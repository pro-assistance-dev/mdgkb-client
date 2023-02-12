import FileInfo from '@/classes/File/FileInfo';
import PointsAchievement from '@/classes/PointsAchievement';
import ResidencyApplication from '@/classes/ResidencyApplication';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IPointsAchievement from '@/interfaces/IPointsAchievement';

export default class ResidencyApplicationPointsAchievement {
  id?: string;
  residencyApplication: ResidencyApplication = new ResidencyApplication();
  residencyApplicationId?: string;
  pointsAchievement: IPointsAchievement = new PointsAchievement();
  pointsAchievementId?: string;
  fileInfoId?: string;
  fileInfo: IFileInfo = new FileInfo();
  approved = false;
  //
  showError = false;

  constructor(i?: ResidencyApplicationPointsAchievement) {
    if (!i) {
      return;
    }
    this.id = i.id;

    this.pointsAchievementId = i.pointsAchievementId;
    if (i.pointsAchievement) {
      this.pointsAchievement = new PointsAchievement(i.pointsAchievement);
    }

    this.residencyApplicationId = i.residencyApplicationId;
    if (i.residencyApplication) {
      this.residencyApplication = new ResidencyApplication(i.residencyApplication);
    }

    this.fileInfoId = i.fileInfoId;
    if (i.fileInfo) {
      this.fileInfo = new FileInfo(i.fileInfo);
    }
    this.approved = i.approved;
  }
}
