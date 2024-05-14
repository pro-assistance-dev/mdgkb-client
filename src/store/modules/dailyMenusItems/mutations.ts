import { MutationTree } from 'vuex';

import DailyMenuItem from '@/classes/DailyMenuItem';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(DailyMenuItem),
};

export default mutations;
