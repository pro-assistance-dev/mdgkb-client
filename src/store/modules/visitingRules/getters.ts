import { GetterTree } from 'vuex';

import IVisitingRule from '@/interfaces/IVisitingRule';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IVisitingRule[] {
    return state.items;
  },
};

export default getters;
