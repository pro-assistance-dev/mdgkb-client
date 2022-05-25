import { MutationTree } from 'vuex';

import Form from '@/classes/Form';
import User from '@/classes/User';
import VacancyResponse from '@/classes/VacancyResponse';
import IForm from '@/interfaces/IForm';
import IUser from '@/interfaces/IUser';
import IVacancy from '@/interfaces/IVacancy';
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';

import { State } from './state';

const mutations: MutationTree<State> = {
  set(state, item: IVacancyResponse) {
    state.item = new VacancyResponse(item);
  },
  resetItem(state) {
    state.item = new VacancyResponse();
  },
  setFormValue(state, form: IForm) {
    state.item.formValue = new Form(form);
  },
  setVacancy(state, vacancy: IVacancy) {
    // state.item.vacancy = new Vacancy(vacancy);
    state.item.vacancyId = vacancy.id;
  },
  setUser(state, user: IUser) {
    state.item.formValue.user = new User(user);
  },
  setEmailExists(state, emailExists: boolean) {
    state.emailExists = emailExists;
  },
};

export default mutations;
