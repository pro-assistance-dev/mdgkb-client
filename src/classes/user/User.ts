import INews from '@/interfaces/news/INews';
import ICategory from '@/interfaces/news/ICategory';
import ITag from '@/interfaces/news/ITag';
import Category from '@/classes/news/Category';
import Tag from '@/classes/news/Tag';
import PreviewThumbnailFile from '@/classes/File/PreviewThumbnailFile';
import IMeta from '@/interfaces/news/IMeta';
import Meta from '@/classes/news/Meta';
import INewsLike from '@/interfaces/news/INewsLike';
import IUser from '@/interfaces/users/IUser';

export default class User implements IUser {
  id?: string = '';
  email = '';
  password?: string = '';

  constructor(i?: IUser) {
    if (!i) return;
    this.id = i.id;
    this.email = i.email;
    this.password = i.password;
  }
}
