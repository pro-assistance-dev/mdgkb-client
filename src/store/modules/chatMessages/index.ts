import { Module } from 'vuex';

import Employee from '@/classes/Employee';
import Chat from '@/services/classes/Chat';
import ChatMessage from '@/services/classes/ChatMessage';
import WebSocketClient from '@/services/WebSocketClient';
import getBaseDefaultState from '@/store/baseModule/baseIndex';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = IBasicState<ChatMessage>;

export const getDefaultState = (): State => {
  return {
    ...getBaseDefaultState(ChatMessage),
  };
};

const state = getDefaultState();
const namespaced = true;

export const chatMessages: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
