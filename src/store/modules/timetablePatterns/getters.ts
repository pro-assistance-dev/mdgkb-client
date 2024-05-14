import { GetterTree } from 'vuex';

import Timetable from '@/classes/Timetable';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Timetable, State>(),
};

export default getters;
