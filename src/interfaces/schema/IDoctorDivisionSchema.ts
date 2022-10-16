import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IDoctorDivisionSchema extends IBaseSchema {
  divisionId: string;
  doctorId: string;
}
