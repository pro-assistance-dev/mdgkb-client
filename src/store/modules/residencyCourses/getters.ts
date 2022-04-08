import { GetterTree } from 'vuex';

import IResidencyCourse from '@/interfaces/IResidencyCourse';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IResidencyCourse[] {
    return state.items;
  },
  item(state): IResidencyCourse {
    return state.item;
  },
};

export default getters;
