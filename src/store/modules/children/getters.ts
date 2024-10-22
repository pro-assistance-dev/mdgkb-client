import { GetterTree } from 'vuex';

import Child from '@/classes/Child';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Child, State>(),
};

export default getters;
