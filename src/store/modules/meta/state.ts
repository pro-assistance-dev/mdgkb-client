import Address from '@/classes/Address';
import KladrApi from '@/classes/KladrApi';
import SocialMedia from '@/classes/SocialMedia';

export interface State {
  count: number;
  socialMedia: SocialMedia[];
  addresses: Address[];
  kladrAPI: KladrApi;
}
