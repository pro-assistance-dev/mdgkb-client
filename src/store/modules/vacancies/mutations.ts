import { MutationTree } from 'vuex';

import Vacancy from '@/classes/Vacancy';
import IVacancy from '@/interfaces/vacancies/IVacancy';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, vacancies: IVacancy[]) {
    state.vacancies = vacancies.map((i: IVacancy) => new Vacancy(i));
  },
  set(state, vacancy?: IVacancy) {
    state.vacancy = new Vacancy(vacancy);
  },
  remove(state, id: string) {
    const index = state.vacancies.findIndex((i: IVacancy) => i.id === id);
    state.vacancies.splice(index, 1);
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

export default mutations;
