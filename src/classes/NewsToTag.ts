import Tag from '@/classes/Tag';
import ClassHelper from '@/services/ClassHelper';

export default class NewsToTag {
  id?: string;
  tagId?: string;
  @ClassHelper.GetClassConstructor(Tag)
  tag: Tag = new Tag();
  newsId?: string;

  constructor(i?: NewsToTag) {
    ClassHelper.BuildClass(this, i);
  }

  static GetClassName(): string {
    return 'newsToTag';
  }

  static Create(newsId?: string, tagId?: string): NewsToTag {
    return ClassHelper.InitClassInstance(new NewsToTag(), { newsId, tagId }) as NewsToTag;
  }
}
