import Project from '@/classes/Project';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<Project> {
  constructor() {
    super(Project, 'projects');
  }
}

const store: S = new S();
export default store;
