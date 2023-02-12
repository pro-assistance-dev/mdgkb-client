import { ActionTree } from 'vuex';

import Employee from '@/classes/Employee';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Employee, State>('employees'),
};

export default actions;
