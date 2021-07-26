import INewsLike from '@/interfaces/news/INewsLike';

export default class NewsLike implements INewsLike {
  id?;
  newsId = '';
  userId = '';

  constructor(i?: INewsLike) {
    if (!i) return;
    this.id = i.id;
    this.newsId = i.newsId;
    this.userId = i.userId;
  }
}
