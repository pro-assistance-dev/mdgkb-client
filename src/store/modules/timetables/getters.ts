import { GetterTree } from 'vuex';

import IWeekday from '@/interfaces/timetables/IWeekday';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  weekdays(state): IWeekday[] | undefined {
    return state.weekdays;
  },
};

export default getters;
