import { GetterTree } from 'vuex';

import Partner from '@/classes/Partner';
import IPartner from '@/interfaces/partners/IPartner';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IPartner[] {
    return state.items;
  },
  filteredItems(state): Partner[] {
    return state.filteredItems;
  },
  item(state): IPartner {
    return state.item;
  },
};

export default getters;
