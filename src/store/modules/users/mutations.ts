import { MutationTree } from 'vuex';

import User from '@/classes/user/User';
import IUser from '@/interfaces/users/IUser';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IUser[]) {
    state.users = items.map((i: IUser) => new User(i));
  },
  set(state, item: IUser) {
    state.user = new User(item);
  },
  emailExist(state, email: string) {
    email && email.length > 0 ? (state.emailExist = true) : (state.emailExist = false);
  },
  setAuthPageEmail(state, email: string) {
    state.authPageEmail = email;
  },
};

export default mutations;
