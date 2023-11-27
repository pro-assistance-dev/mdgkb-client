import { GetterTree } from 'vuex';

import DietAge from '@/classes/DietAge';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<DietAge, State>(),
  selectedItemId(state): string {
    return state.selectedItemId;
  },
};

export default getters;
