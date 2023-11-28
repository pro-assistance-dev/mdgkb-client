import { MutationTree } from 'vuex';

import Child from '@/classes/Child';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Child, State>(Child),
};

export default mutations;
