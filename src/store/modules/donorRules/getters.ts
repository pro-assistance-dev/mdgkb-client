import { GetterTree } from 'vuex';

import IDonorRule from '@/interfaces/IDonorRule';
import IDonorRulesWithDeleted from '@/interfaces/IDonorRulesWithDeleted';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IDonorRulesWithDeleted {
    return state.items;
  },
  donorRules(state): IDonorRule[] {
    return state.items.donorRules;
  },
};

export default getters;
