import { GetterTree } from 'vuex';

import Email from '@/services/classes/Email';
import RootState from '@/services/interfaces/types';
import getBaseGetters from '@/services/store/baseModule/baseGetters';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Email, State>(),
};

export default getters;
