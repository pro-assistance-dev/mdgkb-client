import { GetterTree } from 'vuex';

import PageSideMenu from '@/services/classes/page/PageSideMenu';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<PageSideMenu, State>(),
};

export default getters;
