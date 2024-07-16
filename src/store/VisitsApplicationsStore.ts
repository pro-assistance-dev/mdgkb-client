import Form from '@/classes/Form';
import Gate from '@/classes/Gate';
import User from '@/classes/User';
import Visit from '@/classes/Visit';
import VisitsApplication from '@/classes/VisitsApplication';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<VisitsApplication> {
  constructor() {
    super(VisitsApplication, 'visits-applications');
  }
  SetUser(user: User) {
    this.item.formValue.user = new User(user);
  }
  SetGate(gate: Gate) {
    this.item.gate = new Gate(gate);
    if (this.item.gate) {
      this.item.gateId = this.item.gate.id;
    }
  }
  SetFormValue(form: Form) {
    this.item.formValue = new Form(form);
  }
  SetInitVisit() {
    this.item.visits.push(new Visit());
  }
}

const store: S = new S();
export default store;
