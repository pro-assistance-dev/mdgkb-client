import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IPathPermissionsSchema extends IBaseSchema {
  resource: string;
}
