import { ActionTree } from 'vuex';

import IAppointmentType from '@/interfaces/IAppointmentType';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('appointments-types');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    const items = await httpClient.get<IAppointmentType>({ query: '' });
    commit('setAll', items);
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<IAppointmentType>({ query: `${id}` }));
  },
  update: async ({ state }): Promise<void> => {
    await httpClient.put<IAppointmentType, IAppointmentType>({
      query: `${state.item.id}`,
      payload: state.item,
      isFormData: true,
    });
  },
};

export default actions;
