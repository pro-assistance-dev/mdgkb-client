import { MutationTree } from 'vuex';

import SideOrganization from '@/classes/SideOrganization';
import ISideOrganization from '@/interfaces/sideOrganization/ISideOrganization';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, sideOrganizations: ISideOrganization[]) {
    state.sideOrganizations = sideOrganizations.map((a: ISideOrganization) => new SideOrganization(a));
  },
  set(state, sideOrganization: ISideOrganization) {
    state.sideOrganization = new SideOrganization(sideOrganization);
  },
  remove(state, id: string) {
    const index = state.sideOrganizations.findIndex((i: ISideOrganization) => i.id === id);
    state.sideOrganizations.splice(index, 1);
  },
};

export default mutations;
