import { ActionTree } from 'vuex';

import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IForm from '@/interfaces/IForm';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('form-values');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: IFilterQuery): Promise<void> => {
    const items = await httpClient.get<IForm[]>({ query: filterQuery ? filterQuery.toUrl() : '' });
    if (filterQuery) {
      filterQuery.setAllLoaded(items ? items.length : 0);
    }
    if (filterQuery && filterQuery.pagination.cursorMode) {
      commit('appendToAll', items);
      return;
    }
    commit('setAll', items);
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IForm[]>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state }): Promise<void> => {
    await httpClient.post<IForm, IForm>({
      payload: state.item,
      isFormData: true,
      fileInfos: state.item.getFieldValuesFileInfos(),
    });
  },
  update: async ({ commit }, item: IForm): Promise<void> => {
    const res = await httpClient.put<IForm, IForm>({
      query: `${item.id}`,
      payload: item,
      isFormData: true,
      fileInfos: item.getFieldValuesFileInfos(),
    });
    commit('set', res);
  },
  updateMany: async (_, items): Promise<void> => {
    if (items.length) {
      await httpClient.put<IForm[], IForm[]>({ query: '/many', payload: items, isFormData: true });
    }
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  documentsToPdf: async (_, id: string): Promise<void> => {
    await httpClient.get<undefined>({
      query: `documents-to-pdf/${id}`,
      isBlob: true,
      downloadFileName: 'Документы.pdf',
    });
  },
};

export default actions;
