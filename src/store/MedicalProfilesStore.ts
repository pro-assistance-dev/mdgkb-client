import MedicalProfile from '@/classes/MedicalProfile';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<MedicalProfile> {
  constructor() {
    super(MedicalProfile, 'medical-profiles');
  }
}

const store: S = new S();
export default store;
