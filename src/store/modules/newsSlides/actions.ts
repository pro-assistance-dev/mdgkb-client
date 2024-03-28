import { ActionTree } from 'vuex';

import NewsSlide from '@/classes/NewsSlide';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('news-slides');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<NewsSlide, State>('news-slides'),
  updateAll: async ({ state }): Promise<void> => {
    await httpClient.put<NewsSlide[], NewsSlide[]>({ payload: state.items });
  },
};

export default actions;
