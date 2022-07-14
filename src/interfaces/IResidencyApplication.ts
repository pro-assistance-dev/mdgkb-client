import IPointsAchievement from '@/interfaces/IPointsAchievement';
import IResidencyApplicationPointsAchievement from '@/interfaces/IResidencyApplicationPointsAchievement';

import IFileInfo from './files/IFileInfo';
import IForm from './IForm';
import IResidencyCourse from './IResidencyCourse';

export default interface IResidencyApplication {
  id?: string;
  residencyCourse: IResidencyCourse;
  residencyCourseId?: string;
  pointsEntrance: number;
  pointsAchievements: number;
  applicationNum: string;
  main?: boolean;
  paid?: boolean;
  userEdit?: boolean;
  admissionCommittee?: boolean;
  formValue: IForm;
  formValueId?: string;
  residencyApplicationPointsAchievements: IResidencyApplicationPointsAchievement[];
  residencyApplicationPointsAchievementsForDelete: string[];

  getFileInfos: () => IFileInfo[];
  pointsSum: () => number;
  addAchievement: (pointsAchievement: IPointsAchievement) => void;
  removeAchievementByAchievementId: (achievementId: string) => void;
  achievementExists: (pointsAchievementId: string) => boolean;

  primaryAccreditation?: boolean;
  mdgkbExam?: boolean;
  primaryAccreditationPoints: number;
  primaryAccreditationPlace: string;

  // entranceExamPlace: string;
  entranceExamSpecialisation: string;

  getAchievementResultByAchievementId: (achievementId: string) => IResidencyApplicationPointsAchievement;
  calculateAchievementsPoints: (onlyApproved: boolean) => number;
  validateAchievementsPoints: () => boolean;
  getPrimaryAccreditationInfo: () => string;
  changeUserEdit: (value: boolean) => void;
}
