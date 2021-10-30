import ITag from '@/interfaces/news/ITag';

export default interface INewsToTag {
  id?: string;
  newsId?: string;
  tagId: string;
  tag: ITag;
}
