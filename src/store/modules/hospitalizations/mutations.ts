import { MutationTree } from 'vuex';

import HospitalizationType from '@/classes/hospitalizations/HospitalizationType';
import IHospitalizationType from '@/interfaces/IHospitalizationType';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, hospitalizations: IHospitalizationType[]) {
    state.items = hospitalizations.map((item: IHospitalizationType) => new HospitalizationType(item));
  },
  selectHospitalization(state, hospitalization: IHospitalizationType) {
    state.selectedHospitalization = hospitalization;
  },
};

export default mutations;
