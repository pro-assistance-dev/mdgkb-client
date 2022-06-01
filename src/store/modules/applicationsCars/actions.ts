import { ActionTree } from 'vuex';

import IApplicationCar from '@/interfaces/IApplicationCar';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('applications-cars');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IApplicationCar[]>());
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IApplicationCar[]>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state }): Promise<void> => {
    await httpClient.post<IApplicationCar, IApplicationCar>({
      payload: state.item,
      isFormData: true,
      fileInfos: state.item.getFileInfos(),
    });
  },
  update: async ({ state }): Promise<void> => {
    await httpClient.put<IApplicationCar, IApplicationCar>({
      query: `${state.item.id}`,
      payload: state.item,
      isFormData: true,
      fileInfos: state.item.getFileInfos(),
    });
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
