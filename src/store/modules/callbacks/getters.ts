import { GetterTree } from 'vuex';

import CallbackRequest from '@/services/classes/CallbackRequest';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  item(state): CallbackRequest {
    return state.item;
  },
};

export default getters;
