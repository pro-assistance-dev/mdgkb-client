import ICategory from '@/interfaces/news/ICategory';

export default interface INewsToCategory {
  id?: string;
  newsId?: string;
  categoryId: string;
  category: ICategory;
}
