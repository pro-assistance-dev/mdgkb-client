import { SocialTypes } from '@/services/interfaces/SocialTypes';
import StringsService from '@/services/Strings';

export default class SocialMedia {
  description = '';
  image = '';
  link = '';
  icon = '';
  title = '';
  type: SocialTypes = SocialTypes.YouTube;

  constructor(i?: SocialMedia) {
    if (!i) {
      return;
    }
    this.description = StringsService.removeEmoji(i.description);
    this.image = i.image;
    this.link = i.link;
    this.type = i.type;
    this.setIcon();
    this.setTitle(i.title);
  }

  setIcon(): void {
    this.icon = 'yt';
    if (this.isYouTube()) {
      this.icon = 'yt';
    }
    if (this.isVK()) {
      this.icon = 'vk';
    }
    // if (this.type === SocialTypes.Facebook) {
    //   this.icon = 'fb';
    // }
    // if (this.type === SocialTypes.Instagram) {
    //   this.icon = 'ig';
    // }
  }
  setTitle(title: string): void {
    if (title !== '') {
      this.title = StringsService.removeEmoji(title);
      return;
    }
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

  isYouTube() {
    return this.type === SocialTypes.YouTube;
  }

  isVK() {
    return this.type === SocialTypes.VK;
  }
}
