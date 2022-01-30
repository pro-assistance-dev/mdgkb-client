import { GetterTree } from 'vuex';

import ICallbackRequest from '@/interfaces/ICallbackRequest';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): ICallbackRequest[] {
    return state.items;
  },
};

export default getters;
