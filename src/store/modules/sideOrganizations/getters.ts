import { GetterTree } from 'vuex';

import SideOrganization from '@/classes/SideOrganization';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<SideOrganization, State>(),
};

export default getters;
