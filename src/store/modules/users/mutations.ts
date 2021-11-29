import { MutationTree } from 'vuex';

import User from '@/classes/User';
import IUser from '@/interfaces/IUser';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IUser[]) {
    state.items = items.map((i: IUser) => new User(i));
  },
  set(state, item: IUser) {
    state.item = new User(item);
  },
  emailExist(state, emailExists: boolean) {
    state.emailExists = emailExists;
  },
};

export default mutations;
