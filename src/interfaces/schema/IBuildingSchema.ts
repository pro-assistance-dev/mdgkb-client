import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IBuildingSchema extends IBaseSchema {
  name: string;
  address: string;
  number: string;
}
