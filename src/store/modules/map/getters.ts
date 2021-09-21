import { GetterTree } from 'vuex';

import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  buildingANumber(state): string | undefined {
    return state.buildingANumber;
  },
  buildingBNumber(state): string | undefined {
    return state.buildingBNumber;
  },
  loading(state) {
    return state.loading;
  },
};

export default getters;
