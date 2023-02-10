import { ActionTree } from 'vuex';

import FilterQuery from '@/classes/filters/FilterQuery';
import IEducationalOrganizationAcademic from '@/interfaces/IEducationalOrganizationAcademic';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('educational-organization-academics');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: FilterQuery): Promise<void> => {
    const items = await httpClient.get<IEducationalOrganizationAcademic[]>({ query: filterQuery ? filterQuery.toUrl() : '' });
    if (filterQuery) {
      filterQuery.pagination.setAllLoaded(items ? items.length : 0);
    }
    if (filterQuery && filterQuery.pagination.cursorMode) {
      commit('appendToAll', items);
      return;
    }
    commit('setAll', items);
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<IEducationalOrganizationAcademic>({ query: `${id}` }));
  },
  create: async ({ state }): Promise<void> => {
    await httpClient.post<IEducationalOrganizationAcademic, IEducationalOrganizationAcademic>({
      payload: state.item,
      isFormData: true,
    });
  },
  update: async ({ state, commit }): Promise<void> => {
    const res = await httpClient.put<IEducationalOrganizationAcademic, IEducationalOrganizationAcademic>({
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
