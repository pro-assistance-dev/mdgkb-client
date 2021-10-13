import { GetterTree } from 'vuex';

import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  vacancyResponse(state): IVacancyResponse {
    return state.vacancyResponse;
  },
};

export default getters;
