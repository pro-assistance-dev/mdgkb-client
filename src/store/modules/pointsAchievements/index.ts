import { Module } from 'vuex';

import PointsAchievement from '@/classes/PointsAchievement';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new PointsAchievement(),
  };
};

const state = getDefaultState();
const namespaced = true;

export const pointsAchievements: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
