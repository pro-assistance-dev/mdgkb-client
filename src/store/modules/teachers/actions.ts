import { ActionTree } from 'vuex';

import Teacher from '@/classes/Teacher';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Teacher, State>('teachers'),
};

export default actions;
