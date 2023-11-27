import Category from '@/classes/Category';
import ClassHelper from '@/services/ClassHelper';

export default class NewsToCategory {
  id?: string;
  categoryId = '';
  @ClassHelper.GetClassConstructor(Category)
  category: Category = new Category();
  newsId?: string;

  constructor(i?: NewsToCategory) {
    ClassHelper.BuildClass(this, i);
  }
}
