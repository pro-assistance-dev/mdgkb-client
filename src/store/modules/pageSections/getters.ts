import { GetterTree } from 'vuex';

import PageSection from '@/services/classes/page/PageSection';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<PageSection, State>(),
};

export default getters;
