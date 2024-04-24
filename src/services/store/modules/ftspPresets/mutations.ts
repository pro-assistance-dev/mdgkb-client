import { MutationTree } from 'vuex';

import FTSPPreset from '@/services/classes/FTSPPreset';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<FTSPPreset, State>(FTSPPreset),
};

export default mutations;
