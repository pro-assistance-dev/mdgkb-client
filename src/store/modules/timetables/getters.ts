import { GetterTree } from 'vuex';

import RootState from '@/store/types';

import { State } from './state';
import IWeekday from '@/interfaces/timetables/IWeekday';

const getters: GetterTree<State, RootState> = {
  weekdays(state): IWeekday[] | undefined {
    return state.weekdays;
  },
};

export default getters;
