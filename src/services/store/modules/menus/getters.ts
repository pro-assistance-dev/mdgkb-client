import { GetterTree } from 'vuex';

import Menu from '@/services/classes/Menu';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Menu, State>(),
};

export default getters;
