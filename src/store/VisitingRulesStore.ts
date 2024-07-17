import VisitingRule from '@/classes/VisitingRule';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<VisitingRule> {
  constructor() {
    super(VisitingRule, 'visiting-rules');
  }
}

const store: S = new S();
export default store;
