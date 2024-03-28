import { MutationTree } from 'vuex';

import SideOrganization from '@/classes/SideOrganization';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<SideOrganization, State>(SideOrganization),
};

export default mutations;
