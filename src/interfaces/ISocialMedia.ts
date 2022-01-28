import { SocialTypes } from '@/interfaces/SocialTypes';

export default interface ISocialMedia {
  icon: string;
  title: string;
  type: SocialTypes;
  description: string;
  link: string;
  image: string;
}
