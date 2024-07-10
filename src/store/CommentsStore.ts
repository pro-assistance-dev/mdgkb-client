import Comment from '@/classes/Comment';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<Comment> {
  constructor() {
    super(Comment, 'comments');
  }
}

const store: S = new S();
export default store;
