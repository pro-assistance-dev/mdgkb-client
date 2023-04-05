import { Module } from 'vuex';

import Chat from '@/services/classes/Chat';
import WebSocketClient from '@/services/WebSocketClient';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export interface State extends IBasicState<Chat> {
  client: WebSocketClient;
}
export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(Chat),
    client: new WebSocketClient(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const chats: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
