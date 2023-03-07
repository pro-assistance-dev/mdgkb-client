import { ActionTree } from 'vuex';

import DishesGroup from '@/classes/DishesGroup';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import IDishesGroup from '@/interfaces/IDishesGroup';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('dishes-groups');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: FilterQuery): Promise<void> => {
    commit('setAll', await httpClient.get<IDishesGroup[]>({ query: filterQuery ? filterQuery.toUrl() : '' }));
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
  update: async ({ state }, item: IDishesGroup): Promise<void> => {
    await httpClient.put<IDishesGroup, IDishesGroup>({ query: `${item.id}`, payload: item, isFormData: true });
    const dishesGroupIndex = state.items.findIndex((i: IDishesGroup) => item.id === i.id);
    if (dishesGroupIndex > -1) {
      state.items[dishesGroupIndex] = item;
    }
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
