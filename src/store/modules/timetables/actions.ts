import { ActionTree } from 'vuex';

import ISideOrganization from '@/interfaces/sideOrganization/ISideOrganization';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('timetables');

const actions: ActionTree<State, RootState> = {
  getAllWeekdays: async ({ commit }): Promise<void> => {
    commit('setAllWeekdays', await httpClient.get<ISideOrganization[]>({ query: 'weekdays' }));
  },
};

export default actions;
