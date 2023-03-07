import { ActionTree } from 'vuex';

import FilterQuery from '@/services/classes/filters/FilterQuery';

import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';
import Role from '@/services/classes/Role';

const httpClient = new HttpClient('roles');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: FilterQuery): Promise<void> => {
    const items = await httpClient.get<Role[]>({ query: filterQuery ? filterQuery.toUrl() : '' });
    if (filterQuery) {
      filterQuery.pagination.setAllLoaded(items ? items.length : 0);
    }
    if (filterQuery && filterQuery.pagination.cursorMode) {
      commit('appendToAll', items);
      return;
    }
    commit('setAll', items);
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<Role[]>({ query: `${id}` });
    commit('set', res);
  },
  create: async ({ state }): Promise<void> => {
    await httpClient.post<Role, Role>({
      payload: state.item,
      isFormData: true,
      // fileInfos: state.item.getFileInfos(),
    });
    // TokenService.updateHuman(new Human(state.item.user.human));
  },
  update: async ({ state, commit }): Promise<void> => {
    const res = await httpClient.put<Role, Role>({
      query: `${state.item.id}`,
      payload: state.item,
      isFormData: true,
    });
    commit('set', res);
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
};

export default actions;
