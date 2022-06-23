import { MutationTree } from 'vuex';

import PointsAchievement from '@/classes/PointsAchievement';
import IPointsAchievement from '@/interfaces/IPointsAchievement';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IPointsAchievement[]) {
    state.items = items.map((i: IPointsAchievement) => new PointsAchievement(i));
  },
  set(state, item: IPointsAchievement) {
    state.item = new PointsAchievement(item);
  },
};

export default mutations;
