import { MutationTree } from 'vuex';

import DailyMenuOrder from '@/classes/DailyMenuOrder';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(DailyMenuOrder),
};

export default mutations;
