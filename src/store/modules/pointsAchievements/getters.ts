import { GetterTree } from 'vuex';

import IPointsAchievement from '@/interfaces/IPointsAchievement';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IPointsAchievement[] {
    return state.items;
  },
  item(state): IPointsAchievement {
    return state.item;
  },
};

export default getters;
