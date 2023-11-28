import { GetterTree } from 'vuex';

import AppointmentType from '@/classes/AppointmentType';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  items(state): AppointmentType[] {
    return state.items;
  },
  item(state): AppointmentType {
    return state.item;
  },
};

export default getters;
