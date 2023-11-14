import { MutationTree } from 'vuex';

import Form from '@/classes/Form';
import User from '@/classes/User';
import Vacancy from '@/classes/Vacancy';
import VacancyResponse from '@/classes/VacancyResponse';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { getDefaultState } from '.';
import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(VacancyResponse),
  resetState(state) {
    Object.assign(state, getDefaultState());
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
  setVacancy(state, vacancy: Vacancy) {
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
