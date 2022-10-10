import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IDietSchema extends IBaseSchema {
  name: string;
  diabetes: string;
  agePeriodId: string;
}
