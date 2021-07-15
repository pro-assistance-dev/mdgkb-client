import { GetterTree } from 'vuex';

import IHealthOrganization from '@/interfaces/healthOrganization/IHealthOrganization';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  healthOrganizations(state): IHealthOrganization[] | undefined {
    const { healthOrganizations } = state;
    return healthOrganizations;
  },
};

export default getters;
