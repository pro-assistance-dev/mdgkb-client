import { GetterTree } from 'vuex';

import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  item(state): IVacancyResponse {
    return state.item;
  },
  emailExists(state): boolean {
    return state.emailExists;
  },
};

export default getters;
