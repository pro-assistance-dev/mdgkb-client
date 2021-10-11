import { GetterTree } from 'vuex';

import IVacancy from '@/interfaces/vacancies/IVacancy';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  vacancies(state): IVacancy[] {
    return state.vacancies;
  },
  vacancy(state): IVacancy {
    return state.vacancy;
  },
};

export default getters;
