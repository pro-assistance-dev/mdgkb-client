import { ActionTree } from 'vuex';

import IEmployee from '@/interfaces/IEmployee';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './state';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<IEmployee, State>('employees'),
};

export default actions;
