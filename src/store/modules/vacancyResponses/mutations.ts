import { MutationTree } from 'vuex';

import Form from '@/classes/Form';
import User from '@/classes/User';
import VacancyResponse from '@/classes/VacancyResponse';
import IVacancy from '@/interfaces/IVacancy';
import IVacancyResponsesWithCount from '@/interfaces/IVacancyResponsesWithCount ';
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IVacancyResponse[]) {
    state.items = items.map((i: IVacancyResponse) => new VacancyResponse(i));
  },
  setAllWithCount(state, items: IVacancyResponsesWithCount) {
    if (!items.vacancyResponses) {
      state.items = [];
      return;
    }
    state.items = items.vacancyResponses.map((i: IVacancyResponse) => new VacancyResponse(i));
    state.count = items.count;
  },
  appendToAll(state, items: IVacancyResponsesWithCount) {
    if (!items.vacancyResponses) {
      state.items = [];
      return;
    }
    const vacancyResponses = items.vacancyResponses.map((i: IVacancyResponse) => new VacancyResponse(i));
    state.items.push(...vacancyResponses);
    state.count = items.count;
  },
  set(state, item: IVacancyResponse) {
    state.item = new VacancyResponse(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IVacancyResponse) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItems(state) {
    state.items = [];
  },
  resetItem(state) {
    state.item = new VacancyResponse();
  },
  setFormValue(state, form: Form) {
    state.item.formValue = new Form(form);
  },
  setVacancy(state, vacancy: IVacancy) {
    // state.item.vacancy = new Vacancy(vacancy);
    state.item.vacancyId = vacancy.id;
  },
  setUser(state, user: User) {
    state.item.formValue.user = new User(user);
  },
  setEmailExists(state, emailExists: boolean) {
    state.emailExists = emailExists;
  },
};

export default mutations;
