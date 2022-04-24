import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IDpoCourseSpecializationSchema extends IBaseSchema {
  specializationId: string;
  dpoCourseId: string;
}
