import { GetterTree } from 'vuex';

import IPageSection from '@/interfaces/IPageSection';
import RootState from '@/store/types';

import State from './state';

const getters: GetterTree<State, RootState> = {
  item(state): IPageSection {
    return state.item;
  },
  items(state): IPageSection[] {
    return state.items;
  },
};

export default getters;
