import { ActionTree } from 'vuex';

import DailyMenu from '@/classes/DailyMenu';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('daily-menus');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions(httpClient),
  getPeriodItems: async ({ commit }, filterQuery: FilterQuery): Promise<void> => {
    commit('setPeriodItems', await httpClient.get<DailyMenu[]>({ query: filterQuery ? filterQuery.toUrl() : '' }));
  },
  pdf: async (_, item: DailyMenu): Promise<void> => {
    await httpClient.post<DailyMenu, DailyMenu>({
      query: `pdf`,
      payload: item,
      isBlob: true,
      isFormData: true,
      downloadFileName: 'Меню.pdf',
    });
  },
  todayMenu: async ({ commit }): Promise<void> => {
    commit('setTodayMenu', await httpClient.get<DailyMenu>({ query: 'today-menu' }));
  },
};

export default actions;
