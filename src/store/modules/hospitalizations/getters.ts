import { GetterTree } from 'vuex';

import IHospitalization from '@/interfaces/IHospitalization';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IHospitalization[] {
    return state.items;
  },
  item(state): IHospitalization {
    return state.item;
  },
};

export default getters;
