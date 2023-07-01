import Address from '@/classes/Address';
import KladrApi from '@/classes/KladrApi';
import SocialMedia from '@/classes/SocialMedia';
import ISchema from '@/interfaces/schema/ISchema';

export interface State {
  count: number;
  schema?: ISchema;
  socialMedia: SocialMedia[];
  addresses: Address[];
  kladrAPI: KladrApi;
}
