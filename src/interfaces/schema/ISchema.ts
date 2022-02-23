import ICenterSchema from '@/interfaces/schema/ICenterSchema';
import ICommentsSchema from '@/interfaces/schema/ICommentsSchema';
import IDivisionSchema from '@/interfaces/schema/IDivisionSchema';
import IDoctorSchema from '@/interfaces/schema/IDoctorSchema';
import IDoctorUserSchema from '@/interfaces/schema/IDoctorUserSchema';
import IDpoCourse from '@/interfaces/schema/IDpoCourse';
import IHumanSchema from '@/interfaces/schema/IHumanSchema';
import IMedicalProfileSchema from '@/interfaces/schema/IMedicalProfileSchema';
import ITeacherSchema from '@/interfaces/schema/ITeacherSchema';

export default interface ISchema {
  human: IHumanSchema;
  comment: ICommentsSchema;
  doctor: IDoctorSchema;
  doctorUser: IDoctorUserSchema;
  division: IDivisionSchema;
  center: ICenterSchema;
  medicalProfile: IMedicalProfileSchema;
  teacher: ITeacherSchema;
  dpoCourse: IDpoCourse;
}
