import { GetterTree } from 'vuex';

import Diet from '@/classes/Diet';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Diet, State>(),
};

export default getters;
