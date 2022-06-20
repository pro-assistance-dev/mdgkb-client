import IFileInfo from '@/interfaces/files/IFileInfo';
import IResidencyApplication from '@/interfaces/IResidencyApplication';

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
  }

  getFileInfos(): IFileInfo[] {
    return this.formValue.getFieldValuesFileInfos();
  }

  pointsSum(): number {
    const pointsAchievements = this.pointsAchievements ?? 0;
    const pointsEntrance = this.pointsEntrance ?? 0;
    return pointsAchievements + pointsEntrance;
  }
}
