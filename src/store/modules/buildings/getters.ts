import { GetterTree } from 'vuex';

import Building from '@/classes/Building';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Building, State>(),
};

export default getters;
