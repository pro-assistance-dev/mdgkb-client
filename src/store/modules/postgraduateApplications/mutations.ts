import { MutationTree } from 'vuex';

import PostgraduateApplication from '@/classes/PostgraduateApplication';
import PostgraduateCourse from '@/classes/PostgraduateCourse';
import User from '@/classes/User';
import IPostgraduateApplication from '@/interfaces/IPostgraduateApplication';
import IPostgraduateCourse from '@/interfaces/IPostgraduateCourse';
import IUser from '@/interfaces/IUser';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IPostgraduateApplication[]) {
    state.items = items.map((i: IPostgraduateApplication) => new PostgraduateApplication(i));
  },
  appendToAll(state, items: IPostgraduateApplication[]) {
    const itemsForAdding = items.map((i: IPostgraduateApplication) => new PostgraduateApplication(i));
    state.items.push(...itemsForAdding);
  },
  set(state, item: IPostgraduateApplication) {
    state.item = new PostgraduateApplication(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IPostgraduateApplication) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new PostgraduateApplication();
  },
  setUser(state, user: IUser) {
    state.item.user = new User(user);
  },
  setCourse(state, postgraduateCourse: IPostgraduateCourse) {
    state.item.postgraduateCourse = new PostgraduateCourse(postgraduateCourse);
  },
};

export default mutations;
