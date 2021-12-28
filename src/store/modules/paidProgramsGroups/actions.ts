import { ActionTree } from 'vuex';

import IPaidProgramsGroup from '@/interfaces/IPaidProgram';
import IPaidProgramsGroupsForServer from '@/interfaces/IPaidProgramGroupForServcer';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('paid-programs-groups');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, limit): Promise<void> => {
    commit('setAll', await httpClient.get<IPaidProgramsGroup[]>({ query: limit ? `?limit=${limit}` : '' }));
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<IPaidProgramsGroup>({ query: `${id}` }));
  },
  create: async ({ commit }, item: IPaidProgramsGroup): Promise<void> => {
    await httpClient.post<IPaidProgramsGroup, IPaidProgramsGroup>({ payload: item, fileInfos: [], isFormData: true });
    commit('set');
  },
  update: async ({ commit }, item: IPaidProgramsGroup): Promise<void> => {
    await httpClient.put<IPaidProgramsGroup, IPaidProgramsGroup>({ query: `${item.id}`, payload: item, fileInfos: [], isFormData: true });
    commit('set');
  },
  updateMany: async ({ commit }, items: IPaidProgramsGroupsForServer): Promise<void> => {
    commit(
      'setAll',
      await httpClient.put<IPaidProgramsGroupsForServer, IPaidProgramsGroup[]>({ payload: items, fileInfos: [], isFormData: true })
    );
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
