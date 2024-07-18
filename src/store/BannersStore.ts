import Banner from '@/classes/Banner';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<Banner> {
  constructor() {
    super(Banner, 'banners');
  }
}

const store: S = new S();
export default store;
