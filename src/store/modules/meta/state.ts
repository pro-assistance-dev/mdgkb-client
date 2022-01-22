import ISocial from '@/interfaces/ISocial';
import ISchema from '@/interfaces/schema/ISchema';

export interface State {
  count: number;
  schema?: ISchema;
  socials: ISocial[];
}
