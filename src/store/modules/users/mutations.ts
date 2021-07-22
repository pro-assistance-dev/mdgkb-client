import { MutationTree } from 'vuex';

import { State } from './state';
import IUser from '@/interfaces/users/IUser';
import User from '@/classes/user/User';

const mutations: MutationTree<State> = {
  setAll(state, items: IUser[]) {
    state.users = items.map((i: IUser) => new User(i));
  },
  set(state, item: IUser) {
    state.user = new User(item);
  },
};

export default mutations;
