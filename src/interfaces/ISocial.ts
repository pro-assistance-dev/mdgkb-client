import { SocialTypes } from '@/interfaces/SocialTypes';

export default interface ISocial {
  type: SocialTypes;
  description: string;
  link: string;
  image: string;
}
