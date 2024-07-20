import FormStatusGroup from '@/classes/FormStatusGroup';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<FormStatusGroup> {
  constructor() {
    super(FormStatusGroup, 'form-status-groups');
  }
}

const store: S = new S();
export default store;
