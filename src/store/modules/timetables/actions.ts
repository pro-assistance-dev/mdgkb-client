import { ActionTree } from 'vuex';

import SideOrganization from '@/classes/SideOrganization';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('timetables');

const actions: ActionTree<State, RootState> = {
  getAllWeekdays: async ({ commit }): Promise<void> => {
    commit('setAllWeekdays', await httpClient.get<SideOrganization[]>({ query: 'weekdays' }));
  },
};

export default actions;
