import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface INewsSchema extends IBaseSchema {
  title: string;
  status: string;
  previewText: string;
  slug: string;
  publishedOn: string;
  createdAt: string;
  description: string;
  main: string;
  subMain: string;
  articleLink: string;
  isArticle: string;
  viewsCount: string;
  isDraft: string;
}
