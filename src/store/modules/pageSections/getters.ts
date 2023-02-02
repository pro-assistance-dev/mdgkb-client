import { GetterTree } from 'vuex';

import PageSection from '@/classes/PageSection';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<PageSection, State>(),
};

export default getters;
