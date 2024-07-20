import Appointment from '@/classes/Appointment';
import BaseStore from '@/services/BaseStore';
class S extends BaseStore<Appointment> {
  constructor() {
    super(Appointment, 'appointments');
  }
}

const store: S = new S();
export default store;
