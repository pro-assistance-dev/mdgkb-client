import { GetterTree } from 'vuex';

import PartnerType from '@/classes/PartnerType';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<PartnerType, State>(),
};

export default getters;
