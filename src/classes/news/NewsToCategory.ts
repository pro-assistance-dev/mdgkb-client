import Category from '@/classes/news/Category';
import ICategory from '@/interfaces/news/ICategory';
import INewsToCategory from '@/interfaces/news/INewsToCategory';

export default class NewsToCategory implements INewsToCategory {
  id?: string;
  categoryId = '';
  category: ICategory = new Category();
  newsId?: string;

  constructor(newsToCategory?: INewsToCategory) {
    if (!newsToCategory) {
      return;
    }
    this.id = newsToCategory.id;
    if (newsToCategory.category) {
      this.category = new Category(newsToCategory.category);
    }
  }
}
