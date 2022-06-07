import { MutationTree } from 'vuex';

import Vacancy from '@/classes/Vacancy';
import IVacanciesWithCount from '@/interfaces/IVacanciesWithCount ';
import IVacancy from '@/interfaces/IVacancy';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, vacancies: IVacancy[]) {
    state.vacancies = vacancies.map((i: IVacancy) => new Vacancy(i));
  },
  setAllWithCount(state, items: IVacanciesWithCount) {
    if (!items.vacancies) {
      state.vacancies = [];
      return;
    }
    state.vacancies = items.vacancies.map((i: IVacancy) => new Vacancy(i));
    state.count = items.count;
  },
  appendToAll(state, items: IVacanciesWithCount) {
    if (!items.vacancies) {
      state.vacancies = [];
      return;
    }
    const vacancies = items.vacancies.map((i: IVacancy) => new Vacancy(i));
    state.vacancies.push(...vacancies);
    state.count = items.count;
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
  clearVacancies(state) {
    state.vacancies = [];
  },
};

export default mutations;
