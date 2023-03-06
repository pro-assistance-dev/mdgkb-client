import { ActionTree } from 'vuex';

import Page from '@/services/classes/page/Page';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/store/baseModule/baseActions';
import IBasicState from '@/store/baseModule/baseState';
import RootState from '@/store/types';

export interface State extends IBasicState<Page> {
  isSideMenuDialogActive: boolean;
  isPageSectionDialogActive: boolean;
  index: number;
  pageSectionIndex: number;
}

const httpClient = new HttpClient('pages');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Page, State>('pages'),
  getBySlug: async ({ commit }, slug: string): Promise<void> => {
    const res = await httpClient.get<Page>({ query: `slug/${slug}` });
    commit('set', res);
  },
};

export default actions;
