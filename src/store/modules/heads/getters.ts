import { GetterTree } from 'vuex';

import Head from '@/classes/Head';
import Timetable from '@/classes/timetable/Timetable';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Head, State>(),
  mainDoctor(state): Head {
    const main = state.items.find((head: Head) => head.isMain);
    if (main) {
      return main;
    }
    return new Head();
  },
  timetable(state): Timetable {
    return state.item.timetable;
  },
};

export default getters;
