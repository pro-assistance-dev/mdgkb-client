import { ActionTree } from 'vuex';

import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';
import ICarousel from '@/interfaces/carousels/ICarousel';
import IFileInfo from '@/interfaces/files/IFileInfo';

const httpClient = new HttpClient('carousels');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    const res = await httpClient.get<{ data: ICarousel[] }>();
    commit('setAll', res);
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<ICarousel>({ query: `${id}` });
    commit('set', res);
  },
  getByKey: async ({ commit }, key: string): Promise<void> => {
    const res = await httpClient.get<ICarousel>({ query: `key/${key}` });
    commit('set', res);
  },
  create: async ({ commit }, item: ICarousel): Promise<void> => {
    let fileInfos: IFileInfo[] = [];
    item.carouselSlides.forEach((slide) => {
      if (slide.fileInfo) fileInfos.push(slide.fileInfo);
    });
    const res = await httpClient.post<ICarousel, ICarousel>({ payload: item, fileInfos: fileInfos, isFormData: true });
    commit('appendToAll', item);
  },
  update: async ({ commit }, item: ICarousel): Promise<void> => {
    let fileInfos: IFileInfo[] = [];
    item.carouselSlides.forEach((slide) => {
      if (slide.fileInfo) fileInfos.push(slide.fileInfo);
    });
    const res = await httpClient.put<ICarousel, ICarousel>({
      query: `${item.id}`,
      payload: item,
      fileInfos: fileInfos,
      isFormData: true,
    });
  },
  remove: async ({ commit }, newsId: string): Promise<void> => {
    const res = await httpClient.delete({ query: `${newsId}` });
    commit('remove', newsId);
  },
};

export default actions;
