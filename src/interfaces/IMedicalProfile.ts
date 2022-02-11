import IFileInfo from '@/interfaces/files/IFileInfo';
import IMedicalProfileDivision from '@/interfaces/IMedicalProfileDivision';

export default interface IMedicalProfile {
  id?: string;
  name: string;
  description: string;
  iconId?: string;
  icon: IFileInfo;
  medicalProfilesDivisions: IMedicalProfileDivision[];
  background: string;

  getIconUrl: () => string;
}
