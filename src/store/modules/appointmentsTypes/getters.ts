import { GetterTree } from 'vuex';

import IAppointmentType from '@/interfaces/IAppointmentType';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IAppointmentType[] {
    return state.items;
  },
  item(state): IAppointmentType {
    return state.item;
  },
};

export default getters;
