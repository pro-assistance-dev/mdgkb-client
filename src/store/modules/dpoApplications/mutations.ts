import { MutationTree } from 'vuex';

import DpoApplication from '@/classes/DpoApplication';
import Form from '@/classes/Form';
import NmoCourse from '@/classes/NmoCourse';
import User from '@/classes/User';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(DpoApplication),
  setUser(state, user: User) {
    state.item.formValue.user = new User(user);
  },
  setCourse(state, nmoCourse: NmoCourse) {
    state.item.nmoCourse = new NmoCourse(nmoCourse);
    state.item.dpoCourseId = state.item.nmoCourse.id;
  },
  setEmailExists(state, emailExists: boolean) {
    state.emailExists = emailExists;
  },
  setFormValue(state, form: Form) {
    state.item.formValue = new Form(form);
  },
  changeFormPattern(state, pattern: Form) {
    state.item.formValue.removeAllFieldsAndValues();
    state.item.formValue.applyFormPatternFields(pattern);
    state.item.formValue.initFieldsValues();
  },
};

export default mutations;
