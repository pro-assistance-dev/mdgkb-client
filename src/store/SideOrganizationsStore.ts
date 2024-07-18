import SideOrganization from '@/classes/SideOrganization';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<SideOrganization> {
  constructor() {
    super(SideOrganization, 'side-organizations');
  }
}

const store: S = new S();
export default store;
