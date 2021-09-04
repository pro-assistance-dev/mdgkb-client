import slugify from '@sindresorhus/slugify';

import FileInfo from '@/classes/File/FileInfo';
import Category from '@/classes/news/Category';
import NewsComment from '@/classes/news/NewsComment';
import NewsImage from '@/classes/news/NewsImage';
import NewsLike from '@/classes/news/NewsLike';
import Tag from '@/classes/news/Tag';
import ICategory from '@/interfaces/news/ICategory';
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

  constructor(i?: INews) {
    if (!i) return;
    this.id = i.id;
    this.status = i.status;
    this.title = i.title;
    this.previewText = i.previewText;
    this.fileInfoId = i.fileInfoId;
    this.mainImageId = i.mainImageId;
    this.content = i.content;
    this.slug = i.slug;
    this.viewsCount = i.viewsCount;
    this.category = new Category(i.category);
    if (i.tags) this.tags = i.tags.map((item: ITag) => new Tag(item)) ?? [];
    if (i.fileInfo) this.fileInfo = new FileInfo(i.fileInfo);
    if (i.mainImage) this.mainImage = new FileInfo(i.mainImage);
    this.publishedOn = i.publishedOn;
    if (i.newsLikes) this.newsLikes = i.newsLikes.map((item: INewsLike) => new NewsLike(item));
    if (i.newsComments) this.newsComments = i.newsComments.map((item: INewsComment) => new NewsComment(item));
    if (i.newsImages) this.newsImages = i.newsImages.map((item: INewsImage) => new NewsImage(item));
  }

  createSlug(): void {
    this.slug = slugify(this.title);
  }
}
