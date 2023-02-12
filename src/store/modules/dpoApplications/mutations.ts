import { MutationTree } from 'vuex';

import DpoApplication from '@/classes/DpoApplication';
import DpoCourse from '@/classes/DpoCourse';
import Form from '@/classes/Form';
import User from '@/classes/User';
import IUser from '@/interfaces/IUser';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(DpoApplication),
  setUser(state, user: IUser) {
    state.item.formValue.user = new User(user);
  },
  setCourse(state, dpoCourse: DpoCourse) {
    state.item.dpoCourse = new DpoCourse(dpoCourse);
    state.item.dpoCourseId = state.item.dpoCourse.id;
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
