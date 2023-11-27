import { MutationTree } from 'vuex';

import PointsAchievement from '@/classes/PointsAchievement';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: PointsAchievement[]) {
    state.items = items.map((i: PointsAchievement) => new PointsAchievement(i));
  },
  set(state, item: PointsAchievement) {
    state.item = new PointsAchievement(item);
  },
};

export default mutations;
