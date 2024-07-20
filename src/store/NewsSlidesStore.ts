import NewsSlide from '@/classes/NewsSlide';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<NewsSlide> {
  constructor() {
    super(NewsSlide, 'news-slides');
  }
}

const store: S = new S();
export default store;
