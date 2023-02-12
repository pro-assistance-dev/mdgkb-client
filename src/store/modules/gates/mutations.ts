import { MutationTree } from 'vuex';

import Gate from '@/classes/Gate';
import IGate from '@/interfaces/IGate';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(Gate),
};

export default mutations;
