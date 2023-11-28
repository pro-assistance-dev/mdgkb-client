import { GetterTree } from 'vuex';

import Weekday from '@/classes/Weekday';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  weekdays(state): Weekday[] | undefined {
    return state.weekdays;
  },
};

export default getters;
