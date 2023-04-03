import { ActionTree } from 'vuex';

import IForm from '@/interfaces/IForm';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('form-patterns');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IForm[]>());
  },
  get: async ({ commit }, filterQuery: FilterQuery) => {
    commit('set', await httpClient.get<IForm>({ query: `get${filterQuery.toUrl()}` }));
  },
  create: async ({ state }): Promise<void> => {
    await httpClient.post<IForm, IForm>({ payload: state.item, isFormData: true, fileInfos: state.item.getFileInfos() });
  },
  update: async ({ state, commit }): Promise<void> => {
    const res = await httpClient.put<IForm, IForm>({
      query: `${state.item.id}`,
      payload: state.item,
      isFormData: true,
      fileInfos: state.item.getFileInfos(),
    });
    commit('set', res);
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
