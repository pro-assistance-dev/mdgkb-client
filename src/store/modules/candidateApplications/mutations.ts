import { MutationTree } from 'vuex';

import CandidateApplication from '@/classes/CandidateApplication';
import CandidateExam from '@/classes/CandidateExam';
import Form from '@/classes/Form';
import User from '@/classes/User';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(CandidateApplication),
  setUser(state, user: User) {
    state.item.formValue.user = new User(user);
  },
  setExam(state, exam: CandidateExam) {
    state.item.candidateExam = new CandidateExam(exam);
    state.item.candidateExamId = state.item.candidateExam.id;
  },
  setFormValue(state, form: Form) {
    state.item.formValue = new Form(form);
  },
  setEmailExists(state, emailExists: boolean) {
    state.emailExists = emailExists;
  },
};

export default mutations;
