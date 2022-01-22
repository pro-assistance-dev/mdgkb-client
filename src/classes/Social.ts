import ISocial from '@/interfaces/ISocial';

export default class Social implements ISocial {
  caption = '';
  mediaUrl = '';
  permalink = '';
  constructor(i?: ISocial) {
    if (!i) {
      return;
    }
    this.caption = i.caption;
    this.mediaUrl = i.mediaUrl;
    this.permalink = i.permalink;
  }
}
