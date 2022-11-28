import { MutationTree } from 'vuex';

import HospitalizationType from '@/classes/hospitalizations/HospitalizationType';
import IHospitalizationType from '@/interfaces/IHospitalizationType';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IHospitalizationType[]) {
    state.items = items.map((item: IHospitalizationType) => new HospitalizationType(item));
  },
  set(state, item: IHospitalizationType) {
    state.item = new HospitalizationType(item);
  },
};

export default mutations;
