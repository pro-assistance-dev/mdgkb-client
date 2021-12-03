import { ActionTree } from 'vuex';

import ITimetable from '@/interfaces/timetables/ITimetable';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('timetable-patterns');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<ITimetable[]>());
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<ITimetable>({ query: `${id}` }));
  },
  create: async (_, item: ITimetable): Promise<void> => {
    await httpClient.post<ITimetable, ITimetable>({ payload: item });
  },
  update: async (_, item: ITimetable): Promise<void> => {
    await httpClient.put<ITimetable, ITimetable>({ query: `${item.id}`, payload: item });
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
