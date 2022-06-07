import { MutationTree } from 'vuex';

import Vacancy from '@/classes/Vacancy';
import IVacanciesWithCount from '@/interfaces/IVacanciesWithCount ';
import IVacancy from '@/interfaces/IVacancy';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, vacancies: IVacancy[]) {
    state.items = vacancies.map((i: IVacancy) => new Vacancy(i));
  },
  setAllWithCount(state, items: IVacanciesWithCount) {
    if (!items.vacancies) {
      state.items = [];
      return;
    }
    state.items = items.vacancies.map((i: IVacancy) => new Vacancy(i));
    state.count = items.count;
  },
  appendToAll(state, items: IVacanciesWithCount) {
    if (!items.vacancies) {
      state.items = [];
      return;
    }
    const vacancies = items.vacancies.map((i: IVacancy) => new Vacancy(i));
    state.items.push(...vacancies);
    state.count = items.count;
  },
  set(state, item?: IVacancy) {
    state.item = new Vacancy(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IVacancy) => i.id === id);
    state.items.splice(index, 1);
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  clearVacancies(state) {
    state.items = [];
  },
};

export default mutations;
