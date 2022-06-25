import IFileInfo from '@/interfaces/files/IFileInfo';
import IPointsAchievement from '@/interfaces/IPointsAchievement';
import IResidencyApplication from '@/interfaces/IResidencyApplication';

export default interface IResidencyApplicationPointsAchievement {
  id?: string;
  residencyApplication: IResidencyApplication;
  residencyApplicationId?: string;
  pointsAchievement: IPointsAchievement;
  pointsAchievementId?: string;
  fileInfoId?: string;
  fileInfo: IFileInfo;
  approved: boolean;
  showError: boolean;
}
