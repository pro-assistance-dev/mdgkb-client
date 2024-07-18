import PartnerType from '@/classes/PartnerType';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<PartnerType> {
  constructor() {
    super(PartnerType, 'partners-types');
  }
}

const store: S = new S();
export default store;
