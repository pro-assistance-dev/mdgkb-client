import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IDoctorSchema extends IBaseSchema {
  medicalProfileId: string;
  divisionId: string;
  fullName: string;
  mosDoctorLink: string;
  onlineDoctorId: string;
  commentsCount: string;
}
