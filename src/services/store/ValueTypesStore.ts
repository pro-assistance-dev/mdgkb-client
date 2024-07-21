import BaseStore from '@/services/BaseStore';
import ValueType from '@/services/classes/ValueType';

class S extends BaseStore<ValueType> {
  constructor() {
    super(ValueType, 'user-accounts');
  }
}

const store: S = new S();
export default store;
