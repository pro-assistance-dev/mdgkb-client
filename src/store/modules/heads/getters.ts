import { GetterTree } from 'vuex';

import IHead from '@/interfaces/IHead';
import ITimetable from '@/interfaces/timetables/ITimetable';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IHead[] {
    return state.items;
  },
  item(state): IHead {
    return state.item;
  },
  timetable(state): ITimetable {
    return state.item.timetable;
  },
};

export default getters;
