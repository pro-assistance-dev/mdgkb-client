import EducationalManager from '@/classes/EducationalManager';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<EducationalManager> {
  constructor() {
    super(EducationalManager, 'educational-managers');
  }
}

const store: S = new S();
export default store;
