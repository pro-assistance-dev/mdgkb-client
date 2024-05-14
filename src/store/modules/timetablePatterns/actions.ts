import { ActionTree } from 'vuex';

import Timetable from '@/classes/Timetable';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Timetable, State>('timetable-patterns'),
};

export default actions;
