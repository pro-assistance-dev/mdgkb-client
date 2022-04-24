import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IDoctorUserSchema extends IBaseSchema {
  userId: string;
  doctorId: string;
}
