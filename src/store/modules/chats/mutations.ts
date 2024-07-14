import { MutationTree } from 'vuex';

import Chat from '@/services/classes/Chat';
import ChatMessage from '@/services/classes/ChatMessage';
import getBaseMutations from '@/services/store/baseModule/baseMutations';
import WebSocketClient from '@/services/WebSocketClient';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Chat, State>(Chat),
  setClient(state, client: WebSocketClient) {
    state.client = client;
  },
  addToChatMessages(state, message: ChatMessage) {
    state.item.addChatMessages(new ChatMessage(message));
  },
};

export default mutations;
