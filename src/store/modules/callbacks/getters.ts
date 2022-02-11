import { GetterTree } from 'vuex';

import ICallbackRequest from '@/interfaces/ICallbackRequest';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  item(state): ICallbackRequest {
    return state.item;
  },
};

export default getters;
