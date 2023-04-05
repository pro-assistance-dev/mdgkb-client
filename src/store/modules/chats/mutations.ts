import { MutationTree } from 'vuex';

import Chat from '@/services/classes/Chat';
import ChatMessage from '@/services/classes/ChatMessage';
import WebSocketClient from '@/services/WebSocketClient';
import getBaseMutations from '@/store/baseModule/baseMutations';
import { getDefaultState } from '@/store/modules/news';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Chat, State>(Chat),
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  setClient(state, client: WebSocketClient) {
    state.client = client;
  },
  addToChatMessages(state, message: ChatMessage) {
    state.item.addChatMessages(new ChatMessage(message));
  },
};

export default mutations;