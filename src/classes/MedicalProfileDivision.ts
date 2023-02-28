import Division from '@/classes/Division';
import IMedicalProfile from '@/interfaces/IMedicalProfile';
import IMedicalProfileDivision from '@/interfaces/IMedicalProfileDivision';
import ClassHelper from '@/services/ClassHelper';

export default class MedicalProfileDivision implements IMedicalProfileDivision {
  id?: string;
  medicalProfileId?: string;
  medicalProfile?: IMedicalProfile;
  division = new Division();
  divisionId?: string;

  constructor(i?: IMedicalProfileDivision) {
    ClassHelper.BuildClass(this, i);
  }
}
