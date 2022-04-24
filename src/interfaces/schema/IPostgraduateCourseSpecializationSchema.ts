import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IPostgraduateCourseSpecializationSchema extends IBaseSchema {
  specializationId: string;
  postgraduateCourseId: string;
}
