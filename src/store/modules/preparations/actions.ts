import { ActionTree } from 'vuex';

import IPreparation from '@/interfaces/IPreparation';
import IPreparationsWithDeleted from '@/interfaces/IPreparationsWithDeleted';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('preparations');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IPreparation[]>());
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<IPreparation[]>({ query: `${id}` });
    commit('set', res);
  },
  create: async (_, item: IPreparation): Promise<void> => {
    await httpClient.post<IPreparation, IPreparation>({ payload: item, isFormData: true });
  },
  update: async (_, item: IPreparation): Promise<void> => {
    await httpClient.put<IPreparation, IPreparation>({ query: `${item.id}`, payload: item, isFormData: true });
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  updateMany: async ({ commit, state }): Promise<void> => {
    commit(
      'setAll',
      await httpClient.put<IPreparationsWithDeleted, IPreparationsWithDeleted>({
        payload: { preparations: state.items, preparationsForDeleted: state.itemsForDelete },
        fileInfos: [],
        isFormData: true,
      })
    );
  },
};

export default actions;
