import AppointmentType from '@/classes/AppointmentType';
import BaseStore from '@/services/BaseStore';
class S extends BaseStore<AppointmentType> {
  constructor() {
    super(AppointmentType, 'appointments-types');
  }
}

const store: S = new S();
export default store;
