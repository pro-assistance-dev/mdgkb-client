import Diploma from '@/classes/Diploma';
import FileInfo from '@/services/classes/FileInfo';
import Form from '@/classes/Form';
import PointsAchievement from '@/classes/PointsAchievement';
import ResidencyApplicationPointsAchievement from '@/classes/ResidencyApplicationPointsAchievement';
import ResidencyCourse from '@/classes/ResidencyCourse';
import ClassHelper from '@/services/ClassHelper';
// import ResidencyCourse from './ResidencyCourse';

export default class ResidencyApplication {
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
  @ClassHelper.GetClassConstructor(ResidencyApplicationPointsAchievement)
  residencyApplicationPointsAchievements: ResidencyApplicationPointsAchievement[] = [];
  residencyApplicationPointsAchievementsForDelete: string[] = [];
  primaryAccreditation?: boolean;
  primaryAccreditationPoints = 0;
  primaryAccreditationPlace = '';
  agreedWithRules = false;
  agreedWithPrivacy = false;
  diploma = new Diploma();
  //
  selectedYear?: number;
  formStatusId = '';
  createdAt = '';
  approvingDate = '';
  fullName = '';
  email = '';
  courseName = '';
  pointsSum = '';
  constructor(i?: ResidencyApplication) {
    ClassHelper.BuildClass(this, i);
  }
  setResidencyCourse(item: ResidencyCourse): void {
    console.log(item);
    this.residencyCourse = new ResidencyCourse(item);
    this.residencyCourseId = this.residencyCourse.id;
  }
  getFileInfos(): FileInfo[] {
    const fileInfos: FileInfo[] = [];
    fileInfos.push(...this.formValue.getFileInfos());
    this.residencyApplicationPointsAchievements.forEach((pa: ResidencyApplicationPointsAchievement) => fileInfos.push(pa.fileInfo));
    return fileInfos;
  }

  getPointsSum(): number {
    const pointsAchievements = this.calculateAchievementsPoints(true) ?? 0;
    const pointsEntrance = this.pointsEntrance ?? 0;
    return pointsAchievements + pointsEntrance;
  }
  addAchievement(pointsAchievement: PointsAchievement): void {
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
    let achievements: ResidencyApplicationPointsAchievement[] = [];
    const simpleAchievementsCodes: string[] = ['А', 'Б', 'В', 'Д', 'Е', 'Ж'];
    // const additionalAchievementsCodes: string[] = ['К.1', 'К.2', 'К.3', 'К.4', 'К.5'];
    const orCodes: string[] = ['З', 'И', 'Г.1', 'Г.2', 'Г.3'];

    // const maxAdditionalPoints = 20;
    // let additionalPointsSum = 0;

    this.residencyApplicationPointsAchievements.forEach((item: ResidencyApplicationPointsAchievement) => {
      // if (onlyApproved && !item.approved) {
      //   return;
      // }
      // if (simpleAchievementsCodes.includes(String(item.pointsAchievement.code))) {
      //   achievements.push(item);
      // }
      // const canPlusAdditionalAchievement = additionalPointsSum + item.pointsAchievement.points <= maxAdditionalPoints;
      // if (additionalAchievementsCodes.includes(String(item.pointsAchievement.code)) && canPlusAdditionalAchievement) {
      //   additionalPointsSum += item.pointsAchievement.points;
      //   achievements.push(item);
      // }
      // if (orCodes.includes(String(item.pointsAchievement.code))) {
      //   achievements.push(item);
      // }
      achievements.push(item);
    });

    const orExists = achievements.filter((a: ResidencyApplicationPointsAchievement) => {
      return a.pointsAchievement.code === 'З*' || a.pointsAchievement.code === 'И*';
    });
    if (orExists) {
      achievements = achievements.filter((a: ResidencyApplicationPointsAchievement) => a.pointsAchievement.code !== 'З*');
    }
    // let a = achievements.filter(
    //   (a: ResidencyApplicationPointsAchievement) => String(a.pointsAchievement.code) === '7' || String(a.pointsAchievement.code) === '8'
    // );
    // if (a.length > 1) {
    //   achievements = achievements.filter((a: ResidencyApplicationPointsAchievement) => String(a.pointsAchievement.code) !== '7');
    // }
    // a = achievements.filter(
    //   (a: ResidencyApplicationPointsAchievement) => String(a.pointsAchievement.code) === '4.2' || String(a.pointsAchievement.code) === '4.3'
    // );
    // if (a.length > 1) {
    //   achievements = achievements.filter((a: ResidencyApplicationPointsAchievement) => String(a.pointsAchievement.code) !== '4.2');
    // }
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
    if (value) {
      this.formValue
        .getFieldValuesByCodes([
          'ContractDzm',
          'Application',
          'PrimaryAccreditationApplication',
          'MdgkbExamPointsApplication',
          'MdgkbExamApplication',
          'ExamPlaceApplication',
        ])
        .forEach((el) => {
          el.modChecked = false;
          el.modComment = ' ';
        });
    }
  }

  consentApplicationExists(): boolean {
    const fieldValue = this.formValue.getFieldValueByCode('ConsentApplication');
    if (!fieldValue) {
      return false;
    }
    return !!fieldValue.file?.fileSystemPath;
  }

  static GetClassName(): string {
    return 'residencyApplication';
  }
}
