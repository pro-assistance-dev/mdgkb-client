import { ActionTree } from 'vuex';

import IDishSample from '@/interfaces/IDishSample';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('dishes-samples');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IDishSample[]>());
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IDishSample>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ commit, state }): Promise<void> => {
    const res = await httpClient.post<IDishSample, IDishSample>({
      payload: state.item,
      isFormData: true,
    });
    if (!res) {
      return;
    }
    state.item.id = res.id;
    state.items.unshift(state.item);
  },
  update: async (_, item: IDishSample): Promise<void> => {
    await httpClient.put<IDishSample, IDishSample>({ query: `${item.id}`, payload: item, isFormData: true });
  },
  remove: async ({ state }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    const index = state.items.findIndex((i: IDishSample) => i.id === id);
    if (index > -1) {
      state.items.splice(index, 1);
    }
  },
};

export default actions;
