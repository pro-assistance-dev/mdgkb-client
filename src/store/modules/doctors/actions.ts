import { ActionTree } from 'vuex';

import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';
import IDoctor from '@/interfaces/doctors/IDoctor';

const httpClient = new HttpClient('doctors');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IDoctor[]>());
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<IDoctor>({ query: `${id}` }));
  },
  getByDivisionId: async ({ commit }, id: string) => {
    commit('setDivisionDoctors', await httpClient.get<IDoctor>({ query: `${id}` }));
  },
  create: async ({ commit }, item: IDoctor): Promise<void> => {
    await httpClient.post<IDoctor, IDoctor>({ payload: item, fileInfos: [item.fileInfo], isFormData: true });
    commit('set');
  },
  update: async ({ commit }, item: IDoctor): Promise<void> => {
    await httpClient.put<IDoctor, IDoctor>({ query: `${item.id}`, payload: item, fileInfos: [item.fileInfo], isFormData: true });
    commit('set');
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  setDivisionDoctorsByDivisionId: async ({ commit }, id: string): Promise<void> => {
    commit('setDivisionDoctorsByDivisionId', id);
    commit('filterDoctors');
  },
  addDoctorToDivisionDoctors: async ({ commit }, newDoctor: IDoctor): Promise<void> => {
    commit('addDoctorToDivisionDoctors', newDoctor);
    commit('filterDoctors');
  },
  removeDoctorFromDivisionDoctors: async ({ commit }, id: string): Promise<void> => {
    commit('removeDoctorFromDivisionDoctors', id);
    commit('filterDoctors');
  },
};

export default actions;
