import { MutationTree } from 'vuex';

import MapRoute from '@/classes/MapRoute';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(MapRoute),
};

export default mutations;
