import CallbackRequest from '@/classes/CallbackRequest';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<CallbackRequest> {
  constructor() {
    super(CallbackRequest, 'callback-requests');
  }
}

const store: S = new S();
export default store;
