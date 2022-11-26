import { MutationTree } from 'vuex';

import HospitalizationType from '@/classes/hospitalizations/HospitalizationType';
import IHospitalizationType from '@/interfaces/IHospitalizationType';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IHospitalizationType[]) {
    console.log(items);
    state.items = items.map((item: IHospitalizationType) => new HospitalizationType(item));
  },
};

export default mutations;
