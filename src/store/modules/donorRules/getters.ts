import { GetterTree } from 'vuex';

import DonorRule from '@/classes/DonorRule';
import DonorRulesWithDeleted from '@/classes/DonorRulesWithDeleted';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): DonorRulesWithDeleted {
    return state.items;
  },
  donorRules(state): DonorRule[] {
    return state.items.donorRules;
  },
};

export default getters;
