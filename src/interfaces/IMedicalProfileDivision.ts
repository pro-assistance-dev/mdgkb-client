import Division from '@/classes/Division';
import IMedicalProfile from '@/interfaces/IMedicalProfile';

export default interface IMedicalProfileDivision {
  id?: string;
  medicalProfileId?: string;
  medicalProfile?: IMedicalProfile;
  divisionId?: string;
  division?: Division;
}
