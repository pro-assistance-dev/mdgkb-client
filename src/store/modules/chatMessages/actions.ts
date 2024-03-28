import { ActionTree } from 'vuex';

import ChatMessage from '@/services/classes/ChatMessage';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';
const httpClient = new HttpClient('chat-messages');
const actions: ActionTree<State, RootState> = {
  ...getBaseActions<ChatMessage, State>(httpClient),
};

export default actions;
