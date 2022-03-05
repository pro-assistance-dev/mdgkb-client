import { ActionTree } from 'vuex';

import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IGate from '@/interfaces/IGate';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('gates');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit, state }, filterQuery?: IFilterQuery): Promise<void> => {
    const items = await httpClient.get<IGate[]>({ query: filterQuery ? filterQuery.toUrl() : '' });
    commit('setAll', items);
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IGate[]>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state, commit }): Promise<void> => {
    await httpClient.post<IGate, IGate>({ payload: state.item, isFormData: true });
    commit('resetItem');
  },
  update: async ({ commit }, item: IGate): Promise<void> => {
    const res = await httpClient.put<IGate, IGate>({ query: `${item.id}`, payload: item, isFormData: true });
    commit('set', res);
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
