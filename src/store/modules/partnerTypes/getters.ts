import { GetterTree } from 'vuex';

import IPartnerType from '@/interfaces/partners/IPartnerType';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IPartnerType[] {
    return state.items;
  },
  item(state): IPartnerType {
    return state.item;
  },
};

export default getters;
