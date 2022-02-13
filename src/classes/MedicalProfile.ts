import FileInfo from '@/classes/File/FileInfo';
import MedicalProfileDivision from '@/classes/MedicalProfileDivision';
import MedicalProfileNews from '@/classes/MedicalProfileNews';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IMedicalProfile from '@/interfaces/IMedicalProfile';
import IMedicalProfileDivision from '@/interfaces/IMedicalProfileDivision';
import IMedicalProfileNews from '@/interfaces/IMedicalProfileNews';

export default class MedicalProfile implements IMedicalProfile {
  id?: string;
  name = '';
  description = '';
  icon: IFileInfo = new FileInfo();
  iconId?: string;
  medicalProfilesDivisions: IMedicalProfileDivision[] = [];
  medicalProfilesNews: IMedicalProfileNews[] = [];
  fill = '';
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
    if (i.medicalProfilesNews) {
      this.medicalProfilesNews = i.medicalProfilesNews.map((item: IMedicalProfileNews) => new MedicalProfileNews(item));
    }
  }

  getIconUrl(): string {
    if (this.icon.fileSystemPath) {
      return this.icon.getFileUrl();
    }
    // const numberOfImg = Math.floor(Math.random() * (70 - 1 + 1) + 1);
    return '';
    // return require(`../assets/medicine/${numberOfImg}.svg`);
  }
}
