import { GetterTree } from 'vuex';

import IVacancy from '@/interfaces/IVacancy';
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  vacancies(state): IVacancy[] {
    return state.vacancies;
  },
  vacancy(state): IVacancy {
    return state.vacancy;
  },
  vacancyResponse(state): IVacancyResponse {
    return state.vacancyResponse;
  },
  item(state): IVacancyResponse {
    return state.vacancyResponse;
  },
  count(state): number {
    return state.count;
  },
};

export default getters;
