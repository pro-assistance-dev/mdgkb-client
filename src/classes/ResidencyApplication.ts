import PointsAchievement from '@/classes/PointsAchievement';
import ResidencyApplicationPointsAchievement from '@/classes/ResidencyApplicationPointsAchievement';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IPointsAchievement from '@/interfaces/IPointsAchievement';
import IResidencyApplication from '@/interfaces/IResidencyApplication';
import IResidencyApplicationPointsAchievement from '@/interfaces/IResidencyApplicationPointsAchievement';

import Form from './Form';
import ResidencyCourse from './ResidencyCourse';

export default class ResidencyApplication implements IResidencyApplication {
  id?: string;
  residencyCourse = new ResidencyCourse();
  residencyCourseId?: string;
  formValue = new Form();
  main = false;
  paid = false;
  formValueId?: string;
  pointsEntrance = 0;
  pointsAchievements = 0;
  residencyApplicationPointsAchievements: IResidencyApplicationPointsAchievement[] = [];
  residencyApplicationPointsAchievementsForDelete: string[] = [];
  primaryAccreditation = false;
  primaryAccreditationPoints = 0;
  primaryAccreditationPlace = '';

  constructor(i?: IResidencyApplication) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.residencyCourseId = i.residencyCourseId;
    this.pointsEntrance = i.pointsEntrance;
    this.pointsAchievements = i.pointsAchievements;
    this.formValueId = i.formValueId;
    this.main = i.main;
    this.paid = i.paid;
    if (i.residencyCourse) {
      this.residencyCourse = new ResidencyCourse(i.residencyCourse);
    }
    if (i.formValue) {
      this.formValue = new Form(i.formValue);
    }
    if (i.residencyApplicationPointsAchievements) {
      this.residencyApplicationPointsAchievements = i.residencyApplicationPointsAchievements.map(
        (item: IResidencyApplicationPointsAchievement) => new ResidencyApplicationPointsAchievement(item)
      );
    }
    this.primaryAccreditation = i.primaryAccreditation;
    this.primaryAccreditationPoints = i.primaryAccreditationPoints;
    this.primaryAccreditationPlace = i.primaryAccreditationPlace;
  }

  getFileInfos(): IFileInfo[] {
    return this.formValue.getFieldValuesFileInfos();
  }

  pointsSum(): number {
    const pointsAchievements = this.pointsAchievementsCount() ?? 0;
    const pointsEntrance = this.pointsEntrance ?? 0;
    return pointsAchievements + pointsEntrance;
  }
  addAchievement(pointsAchievement: IPointsAchievement): void {
    const achievement = new ResidencyApplicationPointsAchievement();
    achievement.pointsAchievementId = pointsAchievement.id;
    achievement.pointsAchievement = new PointsAchievement(pointsAchievement);
    this.residencyApplicationPointsAchievements.push(achievement);
  }

  achievementExists(pointsAchievementId: string): boolean {
    return !!this.residencyApplicationPointsAchievements.find(
      (a: IResidencyApplicationPointsAchievement) => a.pointsAchievementId === pointsAchievementId
    );
  }

  pointsAchievementsCount(): number {
    return this.residencyApplicationPointsAchievements.reduce(
      (sum: number, p: ResidencyApplicationPointsAchievement) => sum + (p.approved ? p.pointsAchievement.points : 0),
      0
    );
  }
}
