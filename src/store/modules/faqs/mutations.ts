import { MutationTree } from 'vuex';

import Faq from '@/classes/Faq';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Faq, State>(Faq),
};

export default mutations;
