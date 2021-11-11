import { MutationTree } from 'vuex';

import Human from '@/classes/Human';
import Vacancy from '@/classes/Vacancy';
import VacancyResponse from '@/classes/VacancyResponse';
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
  resetVacancyResponse(state) {
    state.vacancyResponse = new VacancyResponse();
  },
  openVacancyResponse(state, vacancyId: string): void {
    state.vacancyResponse.vacancyId = vacancyId;
    state.vacancyResponse.responseDate = new Date();
    state.vacancyResponse.human = new Human();
    state.vacancyResponse.opened = true;
  },
};

export default mutations;
