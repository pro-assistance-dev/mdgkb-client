import Gate from '@/classes/Gate';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<Gate> {
  constructor() {
    super(Gate, 'gates');
  }
}

const store: S = new S();
export default store;
