import { GetterTree } from 'vuex';

import Chat from '@/services/classes/Chat';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import WebSocketClient from '@/services/WebSocketClient';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Chat, State>(),
  client(state): WebSocketClient | undefined {
    return state.client;
  },
};

export default getters;
