import { GetterTree } from 'vuex';

import IVacancy from '@/interfaces/IVacancy';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  vacancies(state): IVacancy[] {
    return state.vacancies;
  },
  vacancy(state): IVacancy {
    return state.vacancy;
  },
  count(state): number {
    return state.count;
  },
};

export default getters;
