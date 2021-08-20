import { ActionTree } from 'vuex';

import IDivision from '@/interfaces/buildings/IDivision';
import IDivisionImage from '@/interfaces/buildings/IDivisionImage';
import IFileInfo from '@/interfaces/files/IFileInfo';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('divisions');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IDivision[]>());
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<IDivision>({ query: `${id}` }));
  },
  create: async ({ commit }, division: IDivision): Promise<void> => {
    const fileInfos: IFileInfo[] = [];
    division.divisionImages.forEach((image: IDivisionImage) => {
      if (image.fileInfo) fileInfos.push(image.fileInfo);
    });
    await httpClient.post<IDivision, IDivision>({ payload: division, fileInfos: fileInfos, isFormData: true });
    commit('set');
  },
  update: async ({ commit }, division: IDivision): Promise<void> => {
    const fileInfos: IFileInfo[] = [];
    division.divisionImages.forEach((image: IDivisionImage) => {
      if (image.fileInfo) fileInfos.push(image.fileInfo);
    });
    await httpClient.put<IDivision, IDivision>({ query: `${division.id}`, payload: division, fileInfos: fileInfos, isFormData: true });
    commit('set');
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
