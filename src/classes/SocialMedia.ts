import ISocialMedia from '@/interfaces/ISocialMedia';
import { SocialTypes } from '@/interfaces/SocialTypes';

export default class SocialMedia implements ISocialMedia {
  description = '';
  image = '';
  link = '';
  icon = '';
  title = '';
  type: SocialTypes = SocialTypes.YouTube;

  constructor(i?: ISocialMedia) {
    if (!i) {
      return;
    }
    this.description = i.description;
    this.image = i.image;
    this.link = i.link;
    this.type = i.type;
    this.setIcon();
    this.setTitle();
  }

  setIcon(): void {
    this.icon = 'yt';
    if (this.type === SocialTypes.YouTube) {
      this.icon = 'yt';
    }
    // if (this.type === SocialTypes.Facebook) {
    //   this.icon = 'fb';
    // }
    // if (this.type === SocialTypes.Instagram) {
    //   this.icon = 'ig';
    // }
  }
  setTitle(): void {
    if (this.type === SocialTypes.YouTube) {
      this.title = 'Морозовская детская больница';
    }
    // if (this.type === SocialTypes.Facebook) {
    //   this.title = '@morozov2.0';
    // }
    // if (this.type === SocialTypes.Instagram) {
    //   this.title = '@morozdgkbdzm';
    // }
  }
}
