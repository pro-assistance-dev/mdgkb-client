import { GetterTree } from 'vuex';

import TreatDirection from '@/classes/TreatDirection';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<TreatDirection, State>(),
};

export default getters;
