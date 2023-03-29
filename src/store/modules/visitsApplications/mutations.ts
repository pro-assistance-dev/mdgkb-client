import { MutationTree } from 'vuex';

import Form from '@/classes/Form';
import Gate from '@/classes/Gate';
import User from '@/classes/User';
import Visit from '@/classes/Visit';
import VisitsApplication from '@/classes/VisitsApplication';
import IUser from '@/services/interfaces/IUser';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(VisitsApplication),
  resetItems(state) {
    state.items = [];
  },
  setUser(state, user: User) {
    state.item.formValue.user = new User(user);
  },
  setGate(state, gate: Gate) {
    state.item.gate = new Gate(gate);
    state.item.gateId = state.item.gate.id;
  },
  setFormValue(state, form: Form) {
    state.item.formValue = new Form(form);
  },
  setInitVisit(state) {
    state.item.visits.push(new Visit());
  },
};

export default mutations;
