import { GetterTree } from 'vuex';

import RootState from '@/store/types';
import getBaseGetters from '@/services/store/baseModule/baseGetters';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters(),
};

export default getters;
