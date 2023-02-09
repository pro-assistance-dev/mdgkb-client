import { MutationTree } from 'vuex';

import Employee from '@/classes/Employee';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './state';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Employee, State>(Employee),
};

export default mutations;
