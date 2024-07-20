import Tag from '@/classes/Tag';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<Tag> {
  constructor() {
    super(Tag, 'tags');
  }
}

const store: S = new S();
export default store;
