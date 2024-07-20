import FormStatus from '@/classes/FormStatus';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<FormStatus> {
  constructor() {
    super(FormStatus, 'form-statuses');
  }
}

const store: S = new S();
export default store;
