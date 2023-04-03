import { ActionTree } from 'vuex';

import Chat from '@/services/classes/Chat';
import HttpClient from '@/services/HttpClient';
import WebSocketClient from '@/services/WebSocketClient';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';
const httpClient = new HttpClient('chats');
const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Chat, State>(httpClient),
  connect: async ({ commit }, { chatId, userId }): Promise<void> => {
    const client = new WebSocketClient(httpClient.endpoint, `connect/${chatId}/${userId}`, 'addToChatMessages');
    client.setOnMessage(commit);
    commit('setClient', client);
  },
};

export default actions;
