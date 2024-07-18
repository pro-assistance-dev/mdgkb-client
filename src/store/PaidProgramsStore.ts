import PaidProgram from '@/classes/PaidProgram';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<PaidProgram> {
  constructor() {
    super(PaidProgram, 'paid-programs');
  }
}

const store: S = new S();
export default store;
