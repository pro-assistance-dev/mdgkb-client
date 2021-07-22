import INews from '@/interfaces/news/INews';
import ICategory from '@/interfaces/news/ICategory';
import ITag from '@/interfaces/news/ITag';
import Category from '@/classes/news/Category';
import Tag from '@/classes/news/Tag';
import PreviewThumbnailFile from '@/classes/File/PreviewThumbnailFile';
import IMeta from '@/interfaces/news/IMeta';
import Meta from '@/classes/news/Meta';
import INewsLike from '@/interfaces/news/INewsLike';
import INewsComment from '@/interfaces/news/INewsComment';
import IUser from '@/interfaces/users/IUser';
import User from '@/classes/user/User';

export default class NewsComment implements INewsComment {
  id?;
  newsId = '';
  userId = '';
  text = '';
  publishedOn: Date = new Date();
  user: IUser = new User();

  constructor(i?: INewsComment) {
    if (!i) return;
    this.id = i.id;
    this.newsId = i.newsId;
    this.userId = i.userId;
    this.text = i.text;
    this.publishedOn = i.publishedOn;
    this.user = new User(i.user);
  }
}
