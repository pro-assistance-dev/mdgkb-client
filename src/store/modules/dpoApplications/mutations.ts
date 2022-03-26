import { MutationTree } from 'vuex';

import DpoApplication from '@/classes/DpoApplication';
import DpoCourse from '@/classes/DpoCourse';
import User from '@/classes/User';
import IDpoApplication from '@/interfaces/IDpoApplication';
import IDpoCourse from '@/interfaces/IDpoCourse';
import IForm from '@/interfaces/IForm';
import IUser from '@/interfaces/IUser';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IDpoApplication[]) {
    state.items = items.map((i: IDpoApplication) => new DpoApplication(i));
  },
  appendToAll(state, items: IDpoApplication[]) {
    const itemsForAdding = items.map((i: IDpoApplication) => new DpoApplication(i));
    state.items.push(...itemsForAdding);
  },
  set(state, item: IDpoApplication) {
    state.item = new DpoApplication(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IDpoApplication) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new DpoApplication();
  },
  setUser(state, user: IUser) {
    state.item.user = new User(user);
  },
  setCourse(state, dpoCourse: IDpoCourse) {
    state.item.dpoCourse = new DpoCourse(dpoCourse);
  },
  setFieldValues(state, form: IForm) {
    state.item.fieldValues = form.fieldValues;
  },
};

export default mutations;
