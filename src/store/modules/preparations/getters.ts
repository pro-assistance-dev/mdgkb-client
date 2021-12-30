import { GetterTree } from 'vuex';

import IPreparation from '@/interfaces/IPreparation';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IPreparation[] {
    return state.items;
  },
  item(state): IPreparation {
    return state.item;
  },
};

export default getters;
