import { MutationTree } from 'vuex';

import UserAccount from '@/services/classes/UserAccount';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<UserAccount, State>(UserAccount),
};

export default mutations;
