import { GetterTree } from 'vuex';

import Chat from '@/services/classes/Chat';
import ChatMessage from '@/services/classes/ChatMessage';
import WebSocketClient from '@/services/WebSocketClient';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<ChatMessage, State>(),
};

export default getters;
