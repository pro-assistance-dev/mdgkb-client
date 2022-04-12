import { GetterTree } from 'vuex';

import IForm from '@/interfaces/IForm';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IForm[] {
    return state.items;
  },
  item(state): IForm {
    return state.item;
  },
};

export default getters;
