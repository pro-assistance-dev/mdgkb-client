import { MutationTree } from 'vuex';

import Form from '@/classes/Form';
import ResidencyApplication from '@/classes/ResidencyApplication';
import ResidencyCourse from '@/classes/ResidencyCourse';
import User from '@/classes/User';
import IForm from '@/interfaces/IForm';
import IResidencyApplication from '@/interfaces/IResidencyApplication';
import IResidencyCourse from '@/interfaces/IResidencyCourse';
import IUser from '@/interfaces/IUser';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IResidencyApplication[]) {
    state.items = items.map((i: IResidencyApplication) => new ResidencyApplication(i));
  },
  appendToAll(state, items: IResidencyApplication[]) {
    const itemsForAdding = items.map((i: IResidencyApplication) => new ResidencyApplication(i));
    state.items.push(...itemsForAdding);
  },
  set(state, item: IResidencyApplication) {
    state.item = new ResidencyApplication(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IResidencyApplication) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new ResidencyApplication();
  },
  setUser(state, user: IUser) {
    state.item.formValue.user = new User(user);
  },
  setCourse(state, residencyCourse: IResidencyCourse) {
    state.item.residencyCourse = new ResidencyCourse(residencyCourse);
    state.item.residencyCourseId = state.item.residencyCourse.id;
  },
  setEmailExists(state, emailExists: boolean) {
    state.emailExists = emailExists;
  },
  setFormValue(state, form: IForm) {
    state.item.formValue = new Form(form);
  },
  changeFormPattern(state, pattern: IForm) {
    state.item.formValue.removeAllFieldsAndValues();
    state.item.formValue.applyFormPatternFields(pattern);
    state.item.formValue.initFieldsValues();
  },
};

export default mutations;
