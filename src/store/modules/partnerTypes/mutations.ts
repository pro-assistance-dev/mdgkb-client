import { MutationTree } from 'vuex';

import PartnerType from '@/classes/PartnerType';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<PartnerType, State>(PartnerType),
};

export default mutations;
