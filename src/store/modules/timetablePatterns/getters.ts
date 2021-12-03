import { GetterTree } from 'vuex';

import ITimetable from '@/interfaces/timetables/ITimetable';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): ITimetable[] {
    return state.items;
  },
  item(state): ITimetable {
    return state.item;
  },
};

export default getters;
