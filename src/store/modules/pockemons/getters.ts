import { GetterTree } from 'vuex';

import RootState from '@/store/types';
import State from './state';

const getters: GetterTree<State, RootState> = {
  name(state: State): string {
    return state.name;
  },
};

export default getters;
