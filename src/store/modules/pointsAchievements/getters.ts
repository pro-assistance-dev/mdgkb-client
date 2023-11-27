import { GetterTree } from 'vuex';

import PointsAchievement from '@/classes/PointsAchievement';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): PointsAchievement[] {
    return state.items;
  },
  item(state): PointsAchievement {
    return state.item;
  },
};

export default getters;
