import { MutationTree } from 'vuex';

import Form from '@/classes/Form';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(Form),
};

export default mutations;
