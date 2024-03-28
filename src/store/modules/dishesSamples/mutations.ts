import { MutationTree } from 'vuex';

import DishSample from '@/classes/DishSample';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(DishSample),
};

export default mutations;
