import { GetterTree } from 'vuex';

import DonorRule from '@/classes/DonorRule';
import RootState from '@/store/types';

import getBaseGetters from '@/services/store/baseModule/baseGetters';
import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<DonorRule, State>(),
};

export default getters;
