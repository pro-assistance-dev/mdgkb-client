import IMeta from '@/interfaces/news/IMeta';

export default class Meta implements IMeta {
  likes_count = 0;
  constructor(i?: IMeta) {
    if (!i) {
      return;
    }
    this.likes_count = i.likes_count;
  }
}
