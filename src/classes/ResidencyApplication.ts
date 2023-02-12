import PointsAchievement from '@/classes/PointsAchievement';
import ResidencyApplicationPointsAchievement from '@/classes/ResidencyApplicationPointsAchievement';
import ResidencyCourse from '@/classes/ResidencyCourse';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IPointsAchievement from '@/interfaces/IPointsAchievement';
import ClassHelper from '@/services/ClassHelper';

import Form from './Form';
// import ResidencyCourse from './ResidencyCourse';

export default class ResidencyApplication {
  id?: string;
  residencyCourse?: ResidencyCourse;
  residencyCourseId?: string;
  applicationNum = '';
  formValue = new Form();
  main?: boolean;
  paid?: boolean;
  userEdit = false;
  admissionCommittee = false;
  formValueId?: string;
  // entranceExamPlace = '';
  entranceExamSpecialisation = '';
  pointsEntrance = 0;
  pointsAchievements = 0;
  mdgkbExam?: boolean;
  @ClassHelper.GetClassConstructorForArray(ResidencyApplicationPointsAchievement)
  residencyApplicationPointsAchievements: ResidencyApplicationPointsAchievement[] = [];
  residencyApplicationPointsAchievementsForDelete: string[] = [];
  primaryAccreditation?: boolean;
  primaryAccreditationPoints = 0;
  primaryAccreditationPlace = '';

  constructor(i?: ResidencyApplication) {
    ClassHelper.BuildClass(this, i);
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    fileInfos.push(...this.formValue.getFileInfos());
    this.residencyApplicationPointsAchievements.forEach((pa: ResidencyApplicationPointsAchievement) => fileInfos.push(pa.fileInfo));
    return fileInfos;
  }

  pointsSum(): number {
    const pointsAchievements = this.calculateAchievementsPoints(true) ?? 0;
    const pointsEntrance = this.pointsEntrance ?? 0;
    return pointsAchievements + pointsEntrance;
  }
  addAchievement(pointsAchievement: IPointsAchievement): void {
    const achievement = new ResidencyApplicationPointsAchievement();
    achievement.pointsAchievementId = pointsAchievement.id;
    achievement.pointsAchievement = new PointsAchievement(pointsAchievement);
    this.residencyApplicationPointsAchievements.push(achievement);
  }

  calculateAchievementsPoints(onlyApproved: boolean): number {
    const a = this.filterAchievements(onlyApproved);
    return a.reduce((sum: number, p: ResidencyApplicationPointsAchievement) => sum + p.pointsAchievement.points, 0);
  }

  private filterAchievements(onlyApproved: boolean): ResidencyApplicationPointsAchievement[] {
    const simpleAchievementsCodes: string[] = ['1', '2', '3', '4.1', '4.4', '5', '6'];
    const additionalAchievementsCodes: string[] = [
      '9.1',
      '9.2',
      '9.3',
      '9.4',
      '9.5',
      '9.6',
      '9.7',
      '9.8',
      '9.9',
      '9.10',
      '9.11',
      '9.12',
      '9.13',
    ];
    const orCodes: string[] = ['7', '8', '4.2', '4.3'];

    const maxAdditionalPoints = 20;
    let additionalPointsSum = 0;
    let achievements: ResidencyApplicationPointsAchievement[] = [];
    this.residencyApplicationPointsAchievements.forEach((item: ResidencyApplicationPointsAchievement) => {
      if (onlyApproved && !item.approved) {
        return;
      }
      if (simpleAchievementsCodes.includes(String(item.pointsAchievement.code))) {
        achievements.push(item);
      }
      const canPlusAdditionalAchievement = additionalPointsSum + item.pointsAchievement.points <= maxAdditionalPoints;
      if (additionalAchievementsCodes.includes(String(item.pointsAchievement.code)) && canPlusAdditionalAchievement) {
        additionalPointsSum += item.pointsAchievement.points;
        achievements.push(item);
      }
      if (orCodes.includes(String(item.pointsAchievement.code))) {
        achievements.push(item);
      }
    });
    let a = achievements.filter(
      (a: ResidencyApplicationPointsAchievement) => String(a.pointsAchievement.code) === '7' || String(a.pointsAchievement.code) === '8'
    );
    if (a.length > 1) {
      achievements = achievements.filter((a: ResidencyApplicationPointsAchievement) => String(a.pointsAchievement.code) !== '7');
    }
    a = achievements.filter(
      (a: ResidencyApplicationPointsAchievement) => String(a.pointsAchievement.code) === '4.2' || String(a.pointsAchievement.code) === '4.3'
    );
    if (a.length > 1) {
      achievements = achievements.filter((a: ResidencyApplicationPointsAchievement) => String(a.pointsAchievement.code) !== '4.2');
    }
    return achievements;
  }

  achievementExists(pointsAchievementId: string): boolean {
    return !!this.residencyApplicationPointsAchievements.find(
      (a: ResidencyApplicationPointsAchievement) => a.pointsAchievementId === pointsAchievementId
    );
  }

  getAchievementResultByAchievementId(achievementId: string): ResidencyApplicationPointsAchievement {
    const a = this.residencyApplicationPointsAchievements.find(
      (i: ResidencyApplicationPointsAchievement) => i.pointsAchievementId === achievementId
    );
    return a ? a : new ResidencyApplicationPointsAchievement();
  }

  removeAchievementByAchievementId(achievementId: string): void {
    const index = this.residencyApplicationPointsAchievements.findIndex(
      (i: ResidencyApplicationPointsAchievement) => i.pointsAchievementId === achievementId
    );
    ClassHelper.RemoveFromClassByIndex(
      index,
      this.residencyApplicationPointsAchievements,
      this.residencyApplicationPointsAchievementsForDelete
    );
  }

  validateAchievementsPoints(): boolean {
    let valid = true;
    this.residencyApplicationPointsAchievements.forEach((i: ResidencyApplicationPointsAchievement) => {
      if (!i.fileInfo || !i.fileInfo.fileSystemPath) {
        i.showError = true;
        valid = false;
      }
    });
    return valid;
  }

  getPrimaryAccreditationInfo(): string {
    if (this.primaryAccreditation) {
      return `Есть. Место: ${this.primaryAccreditationPlace}. Баллы: ${this.primaryAccreditationPoints}`;
    }
    return `Нет. Сдаёт в: ${this.mdgkbExam ? 'МДГКБ' : this.primaryAccreditationPlace}`;
  }

  changeUserEdit(value: boolean): void {
    this.userEdit = value;
  }
}
