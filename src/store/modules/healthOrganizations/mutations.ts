import { MutationTree } from 'vuex';

import IHealthOrganization from '@/interfaces/healthOrganization/IHealthOrganization';
import HealthOrganization from '@/classes/healthOrganization/HealthOrganization';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, healthOrganizations: IHealthOrganization[]) {
    state.healthOrganizations = healthOrganizations.map((a: IHealthOrganization) => new HealthOrganization(a));
  },
};

export default mutations;
