import Teacher from '@/classes/Teacher';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<Teacher> {
  constructor() {
    super(Teacher, 'teachers');
  }
}

const store: S = new S();
export default store;
