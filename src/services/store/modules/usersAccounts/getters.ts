import { GetterTree } from 'vuex';

import UserAccount from '@/services/classes/UserAccount';
import RootState from '@/services/interfaces/types';
import getBaseGetters from '@/services/store/baseModule/baseGetters';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<UserAccount, State>(),
};

export default getters;
