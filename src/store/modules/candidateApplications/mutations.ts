import { MutationTree } from 'vuex';

import CandidateApplication from '@/classes/CandidateApplication';
import CandidateExam from '@/classes/CandidateExam';
import Form from '@/classes/Form';
import User from '@/classes/User';
import ICandidateApplication from '@/interfaces/ICandidateApplication';
import ICandidateExam from '@/interfaces/ICandidateExam';
import IForm from '@/interfaces/IForm';
import IUser from '@/interfaces/IUser';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: ICandidateApplication[]) {
    state.items = items.map((i: ICandidateApplication) => new CandidateApplication(i));
  },
  appendToAll(state, items: ICandidateApplication[]) {
    const itemsForAdding = items.map((i: ICandidateApplication) => new CandidateApplication(i));
    state.items.push(...itemsForAdding);
  },
  set(state, item: ICandidateApplication) {
    state.item = new CandidateApplication(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: ICandidateApplication) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new CandidateApplication();
  },
  setUser(state, user: IUser) {
    state.item.formValue.user = new User(user);
  },
  setExam(state, exam: ICandidateExam) {
    state.item.candidateExam = new CandidateExam(exam);
    state.item.candidateExamId = state.item.candidateExam.id;
  },
  setFormValue(state, form: IForm) {
    state.item.formValue = new Form(form);
  },
  setEmailExists(state, emailExists: boolean) {
    state.emailExists = emailExists;
  },
};

export default mutations;
