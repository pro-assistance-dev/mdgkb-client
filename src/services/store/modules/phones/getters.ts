import { GetterTree } from 'vuex';

import Phone from '@/services/classes/Phone';
import RootState from '@/services/interfaces/types';
import getBaseGetters from '@/services/store/baseModule/baseGetters';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Phone, State>(),
};

export default getters;
