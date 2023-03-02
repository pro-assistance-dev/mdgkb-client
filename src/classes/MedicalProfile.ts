import MedicalProfileDivision from '@/classes/MedicalProfileDivision';
import MedicalProfileNews from '@/classes/MedicalProfileNews';
import ClassHelper from '@/services/ClassHelper';

export default class MedicalProfile {
  id?: string;
  name = '';
  description = '';
  icon = '';
  svgCode = '';
  iconId?: string;
  @ClassHelper.GetClassConstructor(MedicalProfileDivision)
  medicalProfilesDivisions: MedicalProfileDivision[] = [];
  @ClassHelper.GetClassConstructor(MedicalProfileNews)
  medicalProfilesNews: MedicalProfileNews[] = [];
  fill = '';
  background = '';

  constructor(i?: MedicalProfile) {
    ClassHelper.BuildClass(this, i);
  }
}
