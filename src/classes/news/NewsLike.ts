import INews from '@/interfaces/news/INews';
import ICategory from '@/interfaces/news/ICategory';
import ITag from '@/interfaces/news/ITag';
import Category from '@/classes/news/Category';
import Tag from '@/classes/news/Tag';
import PreviewThumbnailFile from '@/classes/File/PreviewThumbnailFile';
import IMeta from '@/interfaces/news/IMeta';
import Meta from '@/classes/news/Meta';
import INewsLike from '@/interfaces/news/INewsLike';

export default class NewsLike implements INewsLike {
  id = '';
  newsId = '';

  constructor(i?: INewsLike) {
    if (!i) return;
    this.id = i.id;
    this.newsId = i.newsId;
  }
}
