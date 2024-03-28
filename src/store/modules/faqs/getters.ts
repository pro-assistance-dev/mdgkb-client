import { GetterTree } from 'vuex';

import Faq from '@/classes/Faq';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Faq, State>(),
};

export default getters;
