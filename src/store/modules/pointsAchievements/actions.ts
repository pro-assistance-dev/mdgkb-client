import { ActionTree } from 'vuex';

import PointsAchievement from '@/classes/PointsAchievement';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('points-achievements');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }, filterQuery?: FilterQuery): Promise<void> => {
    commit('setAll', await httpClient.get<PointsAchievement[]>({ query: filterQuery ? filterQuery.toUrl() : '' }));
  },
  get: async ({ commit }, id: string): Promise<void> => {
    const res = await httpClient.get<PointsAchievement[]>({ query: `${id}` });
    commit('set', res);
  },
  // create: async ({ state }): Promise<void> => {
  //   await httpClient.post<PointsAchievement, PointsAchievement>({
  //     payload: state.item,
  //     isFormData: true,
  //     fileInfos: state.item.getFileInfos(),
  //   });
  //   TokenService.updateHuman(new Human(state.item.formValue.user.human));
  // },
  // update: async ({ state, commit }): Promise<void> => {
  //   const res = await httpClient.put<PointsAchievement, PointsAchievement>({
  //     query: `${state.item.id}`,
  //     payload: state.item,
  //     isFormData: true,
  //     fileInfos: state.item.getFileInfos(),
  //   });
  //   commit('set', res);
  // },
  // remove: async ({ commit }, id: string): Promise<void> => {
  //   await httpClient.delete({ query: `${id}` });
  //   commit('remove', id);
  // },
  // updateMany: async ({ state }): Promise<void> => {
  //   await httpClient.put<PointsAchievement[], PointsAchievement[]>({ query: 'many', payload: state.items });
  // },
};

export default actions;
