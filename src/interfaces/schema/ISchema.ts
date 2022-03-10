import ICenterSchema from '@/interfaces/schema/ICenterSchema';
import ICommentsSchema from '@/interfaces/schema/ICommentsSchema';
import IDivisionSchema from '@/interfaces/schema/IDivisionSchema';
import IDoctorSchema from '@/interfaces/schema/IDoctorSchema';
import IDoctorUserSchema from '@/interfaces/schema/IDoctorUserSchema';
import IDpoCourse from '@/interfaces/schema/IDpoCourseSchema';
import IHumanSchema from '@/interfaces/schema/IHumanSchema';
import IMedicalProfileSchema from '@/interfaces/schema/IMedicalProfileSchema';
import ISpecializationSchema from '@/interfaces/schema/ISpecializationSchema';
import ITeacherSchema from '@/interfaces/schema/ITeacherSchema';
import IVacancySchema from '@/interfaces/schema/IVacancySchema';

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
  specialization: ISpecializationSchema;
  vacancy: IVacancySchema;
}
