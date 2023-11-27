import { GetterTree } from 'vuex';

import Appointment from '@/classes/Appointment';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Appointment, State>(),
};

export default getters;
