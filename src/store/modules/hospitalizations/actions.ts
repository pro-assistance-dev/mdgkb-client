import { ActionTree } from 'vuex';

import FilterQuery from '@/classes/filters/FilterQuery';
import IHospitalization from '@/interfaces/IHospitalization';
import IHospitalizationType from '@/interfaces/IHospitalizationType';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('hospitalizations');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: FilterQuery): Promise<void> => {
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
  update: async ({ state }): Promise<void> => {
    await httpClient.put<IHospitalization, IHospitalization>({
      query: `${state.item.id}`,
      payload: state.item,
      fileInfos: state.item.getFileInfos(),
      isFormData: true,
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
