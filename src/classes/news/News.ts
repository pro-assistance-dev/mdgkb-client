import INews from '@/interfaces/news/INews';
import ICategory from '@/interfaces/news/ICategory';
import ITag from '@/interfaces/news/ITag';
import Category from '@/classes/news/Category';
import Tag from '@/classes/news/Tag';
import PreviewThumbnailFile from '@/classes/File/PreviewThumbnailFile';
import INewsLike from '@/interfaces/news/INewsLike';
import NewsLike from '@/classes/news/NewsLike';

export default class News implements INews {
  id = '';
  status = '';
  title = '';
  previewText = '';
  content = '';
  slug = '';
  category: ICategory = new Category();
  tags: ITag[] = [];
  previewThumbnailFile = new PreviewThumbnailFile();
  publishedOn: Date = new Date();
  newsLikes: INewsLike[] = [];

  constructor(i?: INews) {
    if (!i) return;
    this.id = i.id;
    this.status = i.status;
    this.title = i.title;
    this.previewText = i.previewText;
    this.content = i.content;
    this.slug = i.slug;
    this.category = new Category(i.category);
    if (i.tags) this.tags = i.tags.map((item: ITag) => new Tag(item));
    if (i.previewThumbnailFile) this.previewThumbnailFile = new PreviewThumbnailFile(i.previewThumbnailFile);
    this.publishedOn = i.publishedOn;
    if (i.newsLikes) this.newsLikes = i.newsLikes.map((item: INewsLike) => new NewsLike(item));
  }
}
