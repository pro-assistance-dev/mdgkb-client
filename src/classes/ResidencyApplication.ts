import PointsAchievement from '@/classes/PointsAchievement';
import ResidencyApplicationPointsAchievement from '@/classes/ResidencyApplicationPointsAchievement';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IPointsAchievement from '@/interfaces/IPointsAchievement';
import IResidencyApplication from '@/interfaces/IResidencyApplication';
import IResidencyApplicationPointsAchievement from '@/interfaces/IResidencyApplicationPointsAchievement';
import ClassHelper from '@/services/ClassHelper';

import Form from './Form';
import ResidencyCourse from './ResidencyCourse';

export default class ResidencyApplication implements IResidencyApplication {
  id?: string;
  residencyCourse = new ResidencyCourse();
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
  residencyApplicationPointsAchievements: IResidencyApplicationPointsAchievement[] = [];
  residencyApplicationPointsAchievementsForDelete: string[] = [];
  primaryAccreditation?: boolean;
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
    this.applicationNum = i.applicationNum;
    this.main = i.main;
    this.mdgkbExam = i.mdgkbExam;
    this.paid = i.paid;
    if (i.userEdit != undefined) {
      this.userEdit = i.userEdit;
    }
    if (i.admissionCommittee != undefined) {
      this.admissionCommittee = i.admissionCommittee;
    }
    // this.entranceExamPlace = i.entranceExamPlace;
    this.entranceExamSpecialisation = i.entranceExamSpecialisation;
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
    const fileInfos: IFileInfo[] = [];
    fileInfos.push(...this.formValue.getFieldValuesFileInfos());
    this.residencyApplicationPointsAchievements.forEach((pa: IResidencyApplicationPointsAchievement) => fileInfos.push(pa.fileInfo));
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
    return a.reduce((sum: number, p: IResidencyApplicationPointsAchievement) => sum + p.pointsAchievement.points, 0);
  }

  private filterAchievements(onlyApproved: boolean): IResidencyApplicationPointsAchievement[] {
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
    let achievements: IResidencyApplicationPointsAchievement[] = [];
    this.residencyApplicationPointsAchievements.forEach((item: IResidencyApplicationPointsAchievement) => {
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
      (a: IResidencyApplicationPointsAchievement) => String(a.pointsAchievement.code) === '7' || String(a.pointsAchievement.code) === '8'
    );
    if (a.length > 1) {
      achievements = achievements.filter((a: IResidencyApplicationPointsAchievement) => String(a.pointsAchievement.code) !== '7');
    }
    a = achievements.filter(
      (a: IResidencyApplicationPointsAchievement) =>
        String(a.pointsAchievement.code) === '4.2' || String(a.pointsAchievement.code) === '4.3'
    );
    if (a.length > 1) {
      achievements = achievements.filter((a: IResidencyApplicationPointsAchievement) => String(a.pointsAchievement.code) !== '4.2');
    }
    return achievements;
  }

  achievementExists(pointsAchievementId: string): boolean {
    return !!this.residencyApplicationPointsAchievements.find(
      (a: IResidencyApplicationPointsAchievement) => a.pointsAchievementId === pointsAchievementId
    );
  }

  getAchievementResultByAchievementId(achievementId: string): IResidencyApplicationPointsAchievement {
    const a = this.residencyApplicationPointsAchievements.find(
      (i: IResidencyApplicationPointsAchievement) => i.pointsAchievementId === achievementId
    );
    return a ? a : new ResidencyApplicationPointsAchievement();
  }

  removeAchievementByAchievementId(achievementId: string): void {
    const index = this.residencyApplicationPointsAchievements.findIndex(
      (i: IResidencyApplicationPointsAchievement) => i.pointsAchievementId === achievementId
    );
    ClassHelper.RemoveFromClassByIndex(
      index,
      this.residencyApplicationPointsAchievements,
      this.residencyApplicationPointsAchievementsForDelete
    );
  }

  validateAchievementsPoints(): boolean {
    let valid = true;
    this.residencyApplicationPointsAchievements.forEach((i: IResidencyApplicationPointsAchievement) => {
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
