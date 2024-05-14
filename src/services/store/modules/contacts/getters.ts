import { GetterTree } from 'vuex';

import Contact from '@/services/classes/Contact';
import RootState from '@/services/interfaces/types';
import getBaseGetters from '@/services/store/baseModule/baseGetters';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Contact, State>(),
};

export default getters;
