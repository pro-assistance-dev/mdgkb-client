import { GetterTree } from 'vuex';

import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IVacancyResponse[] {
    return state.items;
  },
  item(state): IVacancyResponse {
    return state.item;
  },
  emailExists(state): boolean {
    return state.emailExists;
  },
  count(state): number {
    return state.count;
  },
};

export default getters;
