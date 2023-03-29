import { MutationTree } from 'vuex';

import User from '@/classes/User';

import { State } from './state';

interface IUsersWithCount {
  users: User[];
  count: number;
}

const mutations: MutationTree<State> = {
  setAll(state, items: IUsersWithCount) {
    state.items = items.users.map((i: User) => new User(i));
    state.count = items.count;
  },
  set(state, item: User) {
    state.item = new User(item);
  },
  emailExist(state, emailExists: boolean) {
    state.emailExists = emailExists;
  },
  resetItem(state) {
    state.item = new User();
  },
};

export default mutations;
