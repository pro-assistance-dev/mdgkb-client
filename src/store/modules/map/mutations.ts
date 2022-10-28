import { MutationTree } from 'vuex';

import { State } from './state';

const mutations: MutationTree<State> = {
  setBuildingANumber(state, buildingNumber: string) {
    state.buildingANumber = buildingNumber;
  },
  setBuildingBNumber(state, buildingNumber: string) {
    state.buildingBNumber = buildingNumber;
  },
  setLoading(state, value: boolean) {
    state.loading = value;
  },
};

export default mutations;
