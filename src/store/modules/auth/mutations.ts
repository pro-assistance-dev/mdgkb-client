import { MutationTree } from 'vuex';

import State from './state';
import IUser from '@/interfaces/users/IUser';

const mutations: MutationTree<State> = {
  setUser(state, user: IUser) {
    state.user = user;
  },
  setToken(state, token: string) {
    state.token = token;
  },
};

export default mutations;
