import BaseStore from '@/services/BaseStore';
import Menu from '@/services/classes/Menu';

class S extends BaseStore<Menu> {
  constructor() {
    super(Menu, 'menus');
  }
}

const store: S = new S();
export default store;
