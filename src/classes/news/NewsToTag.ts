import Tag from '@/classes/news/Tag';
import INewsToTag from '@/interfaces/news/INewsToTag';
import ITag from '@/interfaces/news/ITag';
export default class NewsToTag {
  id?: string;
  tagId?: string;
  tag: ITag = new Tag();
  newsId?: string;

  constructor(newsToTag?: INewsToTag) {
    if (!newsToTag) {
      return;
    }
    this.id = newsToTag.id;
    if (newsToTag.tag) {
      this.tag = new Tag(newsToTag.tag);
    }
    this.tagId = newsToTag.tagId;
  }

  static GetClassName(): string {
    return 'newsToTag';
  }

  static Create(newsId?: string, tagId?: string): NewsToTag {
    const item = new NewsToTag();
    item.newsId = newsId;
    item.tagId = tagId;
    return item;
  }
}
