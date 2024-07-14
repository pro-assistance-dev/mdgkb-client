import EducationalAcademic from '@/classes/EducationalAcademic';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<EducationalAcademic> {
  constructor() {
    super(EducationalAcademic, 'educational-academics');
  }
}

const store: S = new S();
export default store;
