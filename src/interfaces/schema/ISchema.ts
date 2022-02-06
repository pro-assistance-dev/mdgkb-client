import ICommentsSchema from '@/interfaces/schema/ICommentsSchema';
import IDivisionSchema from '@/interfaces/schema/IDivisionSchema';
import IDoctorSchema from '@/interfaces/schema/IDoctorSchema';
import IHumanSchema from '@/interfaces/schema/IHumanSchema';
import IMedicalProfileSchema from '@/interfaces/schema/IMedicalProfileSchema';

export default interface ISchema {
  human: IHumanSchema;
  comment: ICommentsSchema;
  doctor: IDoctorSchema;
  division: IDivisionSchema;
  medicalProfile: IMedicalProfileSchema;
}
