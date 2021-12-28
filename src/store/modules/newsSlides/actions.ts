import { ActionTree } from 'vuex';

import INewsSlide from '@/interfaces/newsSlides/INewsSlide';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('news-slides');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<INewsSlide[]>());
  },
  get: async ({ commit }, id: string) => {
    commit('set', await httpClient.get<INewsSlide>({ query: `${id}` }));
  },
  create: async (_, item: INewsSlide): Promise<void> => {
    const fileInfos = [item.desktopImg, item.laptopImg, item.tabletImg, item.mobileImg];
    await httpClient.post<INewsSlide, INewsSlide>({ payload: item, fileInfos, isFormData: true });
  },
  update: async (_, item: INewsSlide): Promise<void> => {
    const fileInfos = [item.desktopImg, item.laptopImg, item.tabletImg, item.mobileImg];
    await httpClient.put<INewsSlide, INewsSlide>({ query: `${item.id}`, fileInfos, payload: item, isFormData: true });
  },
  remove: async ({ commit }, id: string): Promise<void> => {
    await httpClient.delete({ query: `${id}` });
    commit('remove', id);
  },
  updateAll: async ({ state }): Promise<void> => {
    await httpClient.put<INewsSlide[], INewsSlide[]>({ payload: state.items });
  },
};

export default actions;
