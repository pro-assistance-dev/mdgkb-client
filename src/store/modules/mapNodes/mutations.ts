import { MutationTree } from 'vuex';

import MapNodeRequestObject from '@/classes/MapNodeRequestObject';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(MapNodeRequestObject),
};

export default mutations;