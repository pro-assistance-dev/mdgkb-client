import { GetterTree } from 'vuex';

import IMedicalProfile from '@/interfaces/IMedicalProfile';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IMedicalProfile[] {
    return state.items;
  },
  item(state): IMedicalProfile {
    return state.item;
  },
};

export default getters;
