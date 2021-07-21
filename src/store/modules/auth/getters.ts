import { GetterTree } from 'vuex';
import RootState from '@/store/types';
import State from './state';

const getters: GetterTree<State, RootState> = {
  building(state): string {
    return state.token;
  },
};

export default getters;
