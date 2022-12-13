import { ActionTree } from 'vuex';

import DishesGroup from '@/classes/DishesGroup';
import IDishesGroup from '@/interfaces/IDishesGroup';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('dishes-groups');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IDishesGroup[]>());
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IDishesGroup>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state }, item: IDishesGroup): Promise<void> => {
    const res = await httpClient.post<IDishesGroup, IDishesGroup>({
      payload: item,
      isFormData: true,
    });
    if (!res) {
      return;
    }
    item.id = res.id;
    state.items.unshift(new DishesGroup(res));
  },
  update: async (_, item: IDishesGroup): Promise<void> => {
    await httpClient.put<IDishesGroup, IDishesGroup>({ query: `${item.id}`, payload: item, isFormData: true });
  },
  remove: async ({ state }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    const index = state.items.findIndex((i: IDishesGroup) => i.id === id);
    if (index > -1) {
      state.items.splice(index, 1);
    }
  },
};

export default actions;
