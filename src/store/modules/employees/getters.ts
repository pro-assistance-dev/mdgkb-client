import { GetterTree } from 'vuex';

import Employee from '@/classes/Employee';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Employee, State>(),
};

export default getters;
