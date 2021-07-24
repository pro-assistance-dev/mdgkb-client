import { MutationTree } from 'vuex';

import ISideOrganization from '@/interfaces/sideOrganization/ISideOrganization';
import SideOrganization from '@/classes/sideOrganization/SideOrganization';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, healthOrganizations: ISideOrganization[]) {
    state.sideOrganizations = healthOrganizations.map((a: ISideOrganization) => new SideOrganization(a));
  },
};

export default mutations;
