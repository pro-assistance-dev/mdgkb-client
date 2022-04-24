import { MutationTree } from 'vuex';

import User from '@/classes/User';
import IUser from '@/interfaces/IUser';

import { State } from './state';

interface IUsersWithCount {
  users: IUser[];
  count: number;
}

const mutations: MutationTree<State> = {
  setAll(state, items: IUsersWithCount) {
    state.items = items.users.map((i: IUser) => new User(i));
    state.count = items.count;
  },
  set(state, item: IUser) {
    state.item = new User(item);
  },
  emailExist(state, emailExists: boolean) {
    state.emailExists = emailExists;
  },
};

export default mutations;
