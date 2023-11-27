import ClassHelper from '@/services/ClassHelper';

export default class NewsLike {
  id?: string;
  newsId = '';
  userId = '';

  constructor(i?: NewsLike) {
    ClassHelper.BuildClass(this, i);
  }
}
