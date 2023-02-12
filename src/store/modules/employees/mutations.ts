import { MutationTree } from 'vuex';

import Employee from '@/classes/Employee';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Employee, State>(Employee),
};

export default mutations;
