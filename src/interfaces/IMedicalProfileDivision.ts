import IDivision from '@/interfaces/buildings/IDivision';
import IMedicalProfile from '@/interfaces/IMedicalProfile';

export default interface IMedicalProfileDivision {
  id?: string;
  medicalProfileId?: string;
  medicalProfile?: IMedicalProfile;
  divisionId?: string;
  division?: IDivision;
}
