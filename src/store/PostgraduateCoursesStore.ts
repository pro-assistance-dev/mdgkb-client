import PostgraduateCourse from '@/classes/PostgraduateCourse';
import BaseStore from '@/services/BaseStore';
class S extends BaseStore<PostgraduateCourse> {
  constructor() {
    super(PostgraduateCourse, 'postgraduate-course');
  }
}

const store: S = new S();
export default store;
