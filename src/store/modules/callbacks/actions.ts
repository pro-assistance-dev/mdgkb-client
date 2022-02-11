import { ActionTree } from 'vuex';

import ICallbackRequest from '@/interfaces/ICallbackRequest';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('callback-requests');

const actions: ActionTree<State, RootState> = {
  create: async ({ state, commit }): Promise<void> => {
    await httpClient.post<ICallbackRequest, ICallbackRequest>({ payload: state.item });
    commit('resetItem');
  },
};

export default actions;
