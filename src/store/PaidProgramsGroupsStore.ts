import PaidProgramsGroup from '@/classes/PaidProgramsGroup';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<PaidProgramsGroup> {
  constructor() {
    super(PaidProgramsGroup, 'paid-programs-groups');
  }
}

const store: S = new S();
export default store;
