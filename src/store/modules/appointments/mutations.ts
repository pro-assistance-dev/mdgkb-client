import { MutationTree } from 'vuex';

import Appointment from '@/classes/Appointment';
import IAppointment from '@/interfaces/IAppointment';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IAppointment[]) {
    state.items = items.map((i: IAppointment) => new Appointment(i));
  },
  set(state, item: IAppointment) {
    state.item = new Appointment(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IAppointment) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new Appointment();
  },
};

export default mutations;
