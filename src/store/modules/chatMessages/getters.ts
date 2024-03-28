import { GetterTree } from 'vuex';

import ChatMessage from '@/services/classes/ChatMessage';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<ChatMessage, State>(),
};

export default getters;
