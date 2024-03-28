import { MutationTree } from 'vuex';

import DietAge from '@/classes/DietAge';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<DietAge, State>(DietAge),
  setSelectedAgePeriodId(state, id: string) {
    state.selectedItemId = id;
  },
};

export default mutations;
