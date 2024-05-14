import { GetterTree } from 'vuex';

import Teacher from '@/classes/Teacher';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Teacher, State>(),
};

export default getters;
