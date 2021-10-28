import slugify from '@sindresorhus/slugify';

import FileInfo from '@/classes/File/FileInfo';
import Category from '@/classes/news/Category';
import Event from '@/classes/news/Event';
import NewsComment from '@/classes/news/NewsComment';
import NewsImage from '@/classes/news/NewsImage';
import NewsLike from '@/classes/news/NewsLike';
import Tag from '@/classes/news/Tag';
import ICategory from '@/interfaces/news/ICategory';
import IEvent from '@/interfaces/news/IEvent';
import INews from '@/interfaces/news/INews';
import INewsComment from '@/interfaces/news/INewsComment';
import INewsImage from '@/interfaces/news/INewsImage';
import INewsLike from '@/interfaces/news/INewsLike';
import ITag from '@/interfaces/news/ITag';

export default class News implements INews {
  id?: string;
  status = '';
  title = '';
  previewText = '';
  content = '';
  slug = '';
  category: ICategory = new Category();
  tags: ITag[] = [];
  fileInfo = new FileInfo();
  fileInfoId?: string;
  mainImage = new FileInfo();
  mainImageId?: string;
  publishedOn: Date = new Date();
  newsLikes: INewsLike[] = [];
  newsComments: INewsComment[] = [];
  newsImages: INewsImage[] = [];
  newsImagesForDelete: string[] = [];
  newsImagesNames: string[] = [];
  viewsCount = 0;
  event?: IEvent;

  constructor(news?: INews) {
    if (!news) {
      return;
    }
    this.id = news.id;
    this.status = news.status;
    this.title = news.title;
    this.previewText = news.previewText;
    this.fileInfoId = news.fileInfoId;
    this.mainImageId = news.mainImageId;
    this.content = news.content;
    this.slug = news.slug;
    this.viewsCount = news.viewsCount;
    this.category = new Category(news.category);
    if (news.tags) {
      this.tags = news.tags.map((item: ITag) => new Tag(item)) ?? [];
    }
    if (news.fileInfo) {
      this.fileInfo = new FileInfo(news.fileInfo);
    }
    if (news.mainImage) {
      this.mainImage = new FileInfo(news.mainImage);
    }
    this.publishedOn = news.publishedOn;
    if (news.newsLikes) {
      this.newsLikes = news.newsLikes.map((item: INewsLike) => new NewsLike(item));
    }
    if (news.newsComments) {
      this.newsComments = news.newsComments.map((item: INewsComment) => new NewsComment(item));
    }
    if (news.newsImages) {
      this.newsImages = news.newsImages.map((item: INewsImage) => new NewsImage(item));
    }
    if (news.event) {
      this.event = new Event(news.event);
    }
  }

  createSlug(): void {
    this.slug = slugify(this.title);
  }
}
