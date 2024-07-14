import { MutationTree } from 'vuex';

import ChatMessage from '@/services/classes/ChatMessage';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<ChatMessage, State>(ChatMessage),
};

export default mutations;
