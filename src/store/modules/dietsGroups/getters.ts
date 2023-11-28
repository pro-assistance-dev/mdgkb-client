import { GetterTree } from 'vuex';

import DietGroup from '@/classes/DietGroup';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<DietGroup, State>(),
};

export default getters;
