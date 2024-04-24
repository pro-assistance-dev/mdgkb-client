import { MutationTree } from 'vuex';

import Menu from '@/services/classes/Menu';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Menu, State>(Menu),
};

export default mutations;
