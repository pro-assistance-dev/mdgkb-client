import { ActionTree } from 'vuex';

import FilterQuery from '@/classes/filters/FilterQuery';
import PageSideMenu from '@/classes/PageSideMenu';
import Page from '@/services/classes/Page';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('page-side-menus');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<PageSideMenu, State>('page-side-menus'),
  updateOrder: async ({ state }): Promise<void> => {
    await httpClient.put<PageSideMenu[], PageSideMenu[]>({
      query: 'order',
      payload: state.items,
      isFormData: true,
    });
  },
};

export default actions;
