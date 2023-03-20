import { ActionTree } from 'vuex';

import DishesGroup from '@/classes/DishesGroup';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('dishes-groups');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: FilterQuery): Promise<void> => {
    commit('setAll', await httpClient.get<DishesGroup[]>({ query: filterQuery ? filterQuery.toUrl() : '' }));
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<DishesGroup>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state }, item: DishesGroup): Promise<void> => {
    const res = await httpClient.post<DishesGroup, DishesGroup>({
      payload: item,
      isFormData: true,
    });
    if (!res) {
      return;
    }
    item.id = res.id;
    state.items.unshift(new DishesGroup(res));
  },
  update: async ({ state }, item: DishesGroup): Promise<void> => {
    await httpClient.put<DishesGroup, DishesGroup>({ query: `${item.id}`, payload: item, isFormData: true });
    const dishesGroupIndex = state.items.findIndex((i: DishesGroup) => item.id === i.id);
    if (dishesGroupIndex > -1) {
      state.items[dishesGroupIndex] = item;
    }
  },
  remove: async ({ state }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    const index = state.items.findIndex((i: DishesGroup) => i.id === id);
    if (index > -1) {
      state.items.splice(index, 1);
    }
  },
};

export default actions;
