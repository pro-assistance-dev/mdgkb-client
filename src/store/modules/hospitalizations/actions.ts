import { ActionTree } from 'vuex';

import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IHospitalization from '@/interfaces/IHospitalization';
import IHospitalizationType from '@/interfaces/IHospitalizationType';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('hospitalizations');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: IFilterQuery): Promise<void> => {
    commit('setAll', await httpClient.get<IHospitalization>({ query: filterQuery ? filterQuery.toUrl() : '' }));
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<IHospitalization>({ query: `${id}` }));
  },
  create: async ({ state }): Promise<void> => {
    await httpClient.post<IHospitalization, IHospitalization>({
      payload: state.item,
      isFormData: true,
      fileInfos: state.item.getFileInfos(),
    });
  },
  pdf: async (_, id: string): Promise<void> => {
    await httpClient.get<IHospitalizationType>({
      query: `pdf/${id}`,
      isBlob: true,
    });
  },
};

export default actions;
