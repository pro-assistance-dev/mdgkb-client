import { GetterTree } from 'vuex';

import Specialization from '@/classes/Specialization';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Specialization, State>(),
};

export default getters;
