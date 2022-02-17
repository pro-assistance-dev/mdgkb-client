import IMedicalProfileDivision from '@/interfaces/IMedicalProfileDivision';
import IMedicalProfileNews from '@/interfaces/IMedicalProfileNews';

export default interface IMedicalProfile {
  id?: string;
  name: string;
  description: string;
  iconId?: string;
  icon: string;
  svgCode: string;
  medicalProfilesDivisions: IMedicalProfileDivision[];
  medicalProfilesNews: IMedicalProfileNews[];
  background: string;
  fill: string;

  // getIconUrl: () => string;
}
