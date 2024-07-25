import BaseStore from '@/services/BaseStore';
import CallbackRequest from '@/services/classes/CallbackRequest';

class S extends BaseStore<CallbackRequest> {
  constructor() {
    super(CallbackRequest, 'callback-requests');
  }
}

const store: S = new S();
export default store;
