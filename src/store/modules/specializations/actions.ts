import { ActionTree } from 'vuex';

import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ISpecialization from '@/interfaces/ISpecialization';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('specializations');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit, state }, filterQuery?: IFilterQuery): Promise<void> => {
    const items = await httpClient.get<ISpecialization[]>({ query: filterQuery ? filterQuery.toUrl() : '' });
    commit('setAll', items);
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<ISpecialization[]>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state, commit }): Promise<void> => {
    await httpClient.post<ISpecialization, ISpecialization>({ payload: state.item, isFormData: true });
    commit('resetItem');
  },
  update: async ({ commit }, item: ISpecialization): Promise<void> => {
    const res = await httpClient.put<ISpecialization, ISpecialization>({ query: `${item.id}`, payload: item, isFormData: true });
    commit('set', res);
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
