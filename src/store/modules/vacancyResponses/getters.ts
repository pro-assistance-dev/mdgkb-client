import { GetterTree } from 'vuex';

import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters(),
  emailExists(state): boolean {
    return state.emailExists;
  },
  count(state): number {
    return state.count;
  },
};

export default getters;
