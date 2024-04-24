import { GetterTree } from 'vuex';

import FTSPPreset from '@/services/classes/FTSPPreset';
import RootState from '@/services/interfaces/types';
import getBaseGetters from '@/services/store/baseModule/baseGetters';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<FTSPPreset, State>(),
};

export default getters;
