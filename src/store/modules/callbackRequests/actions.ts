import { ActionTree } from 'vuex';

import IBanner from '@/interfaces/banners/IBanner';
import ICallbackRequest from '@/interfaces/ICallbackRequest';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('visiting-rules');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<ICallbackRequest[]>());
  },
  create: async ({ commit }, item: ICallbackRequest): Promise<void> => {
    await httpClient.post<ICallbackRequest, IBanner>({ payload: item, isFormData: true });
    commit('set');
  },
};

export default actions;
