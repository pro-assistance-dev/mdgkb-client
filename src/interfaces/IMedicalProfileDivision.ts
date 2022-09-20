import IDivision from '@/interfaces/IDivision';
import IMedicalProfile from '@/interfaces/IMedicalProfile';

export default interface IMedicalProfileDivision {
  id?: string;
  medicalProfileId?: string;
  medicalProfile?: IMedicalProfile;
  divisionId?: string;
  division?: IDivision;
}
