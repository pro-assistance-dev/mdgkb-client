import Division from '@/classes/Division';
import MedicalProfile from '@/classes/MedicalProfile';
import ClassHelper from '@/services/ClassHelper';

export default class MedicalProfileDivision {
  id?: string;
  medicalProfileId?: string;
  medicalProfile?: MedicalProfile;
  division = new Division();
  divisionId?: string;

  constructor(i?: MedicalProfileDivision) {
    ClassHelper.BuildClass(this, i);
  }
}
