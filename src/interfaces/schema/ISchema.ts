import ICommentsSchema from '@/interfaces/schema/ICommentsSchema';
import IDivisionSchema from '@/interfaces/schema/IDivisionSchema';
import IDoctorSchema from '@/interfaces/schema/IDoctorSchema';
import IDoctorUserSchema from '@/interfaces/schema/IDoctorUserSchema';
import IHumanSchema from '@/interfaces/schema/IHumanSchema';
import IMedicalProfileSchema from '@/interfaces/schema/IMedicalProfileSchema';

export default interface ISchema {
  human: IHumanSchema;
  comment: ICommentsSchema;
  doctor: IDoctorSchema;
  doctorUser: IDoctorUserSchema;
  division: IDivisionSchema;
  medicalProfile: IMedicalProfileSchema;
}
