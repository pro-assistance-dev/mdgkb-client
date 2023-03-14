import { ActionTree } from 'vuex';

import DishSample from '@/classes/DishSample';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('dishes-samples');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<DishSample[]>());
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<DishSample>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ commit, state }): Promise<void> => {
    const res = await httpClient.post<DishSample, DishSample>({
      payload: state.item,
      isFormData: true,
      fileInfos: state.item.getFileInfos(),
    });
    if (!res) {
      return;
    }
    state.item.id = res.id;
    state.items.unshift(new DishSample(state.item));
  },
  update: async ({ state }): Promise<void> => {
    await httpClient.put<DishSample, DishSample>({
      query: `${state.item.id}`,
      payload: state.item,
      isFormData: true,
      fileInfos: state.item.getFileInfos(),
    });
    // console.log('actions update' + state.item.updateAt);
  },
  updateAll: async (_, items: DishSample[]): Promise<void> => {
    await httpClient.put<DishSample[], DishSample[]>({
      payload: items,
      isFormData: true,
    });
  },
  remove: async ({ state }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    const index = state.items.findIndex((i: DishSample) => i.id === id);
    if (index > -1) {
      state.items.splice(index, 1);
    }
  },
};

export default actions;
