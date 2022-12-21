import { MutationTree } from 'vuex';

import AppointmentType from '@/classes/AppointmentType';
import IAppointmentType from '@/interfaces/IAppointmentType';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IAppointmentType[]) {
    state.items = items.map((item: IAppointmentType) => new AppointmentType(item));
  },
  set(state, item: IAppointmentType) {
    state.item = new AppointmentType(item);
  },
};

export default mutations;
