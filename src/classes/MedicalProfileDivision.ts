import Division from '@/classes/buildings/Division';
import MedicalProfile from '@/classes/MedicalProfile';
import IDivision from '@/interfaces/buildings/IDivision';
import IMedicalProfile from '@/interfaces/IMedicalProfile';
import IMedicalProfileDivision from '@/interfaces/IMedicalProfileDivision';

export default class MedicalProfileDivision implements IMedicalProfileDivision {
  id?: string;
  medicalProfileId?: string;
  medicalProfile?: IMedicalProfile;
  division?: IDivision;
  divisionId?: string;

  constructor(i?: IMedicalProfileDivision) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.medicalProfileId = i.medicalProfileId;
    this.divisionId = i.divisionId;
    if (i.medicalProfile) {
      this.medicalProfile = new MedicalProfile(i.medicalProfile);
    }
    if (i.division) {
      this.division = new Division(i.division);
    }
  }
}
