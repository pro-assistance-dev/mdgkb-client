import { GetterTree } from 'vuex';

import IAppointment from '@/interfaces/IAppointment';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IAppointment[] {
    return state.items;
  },
  item(state): IAppointment {
    return state.item;
  },
};

export default getters;
