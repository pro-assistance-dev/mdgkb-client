import FileInfo from '@/classes/File/FileInfo';
import MedicalProfileDivision from '@/classes/MedicalProfileDivision';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IMedicalProfile from '@/interfaces/IMedicalProfile';
import IMedicalProfileDivision from '@/interfaces/IMedicalProfileDivision';

export default class MedicalProfile implements IMedicalProfile {
  id?: string;
  name = '';
  description = '';
  icon: IFileInfo = new FileInfo();
  iconId?: string;
  medicalProfilesDivisions: IMedicalProfileDivision[] = [];
  background = '';

  constructor(i?: IMedicalProfile) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.description = i.description;
    this.iconId = i.iconId;
    if (i.icon) {
      this.icon = new FileInfo(i.icon);
    }
    if (i.medicalProfilesDivisions) {
      this.medicalProfilesDivisions = i.medicalProfilesDivisions.map((item: IMedicalProfileDivision) => new MedicalProfileDivision(item));
    }
  }

  getIconUrl(): string {
    if (this.icon.fileSystemPath) {
      return this.icon.getFileUrl();
    }
    const numberOfImg = Math.floor(Math.random() * (70 - 1 + 1) + 1);
    // return '';
    return require(`../assets/medicine/${numberOfImg}.svg`);
  }
}
