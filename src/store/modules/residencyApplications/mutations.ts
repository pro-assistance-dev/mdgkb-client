import { MutationTree } from 'vuex';

import Form from '@/classes/Form';
import ResidencyApplication from '@/classes/ResidencyApplication';
import ResidencyCourse from '@/classes/ResidencyCourse';
import User from '@/classes/User';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<ResidencyApplication, State>(ResidencyApplication),
  resetItem(state) {
    state.item = new ResidencyApplication();
    state.emailExists = false;
  },
  setUser(state, user: User) {
    state.item.formValue.user = new User(user);
  },
  setCourse(state, residencyCourse: ResidencyCourse) {
    state.item.residencyCourse = new ResidencyCourse(residencyCourse);
    state.item.residencyCourseId = state.item.residencyCourse.id;
  },
  setEmailExists(state, emailExists: boolean) {
    state.emailExists = emailExists;
  },
  setTypeExists(state, typeExists: boolean) {
    state.typeExists = typeExists;
  },
  setFormValue(state, form: Form) {
    state.item.formValue = new Form(form);
  },
  changeFormPattern(state, pattern: Form) {
    state.item.formValue.removeAllFieldsAndValues();
    state.item.formValue.applyFormPatternFields(pattern);
    state.item.formValue.initFieldsValues();
  },
  setAdmissionCommittee(state, value: boolean) {
    state.item.admissionCommittee = value;
  },
};

export default mutations;
