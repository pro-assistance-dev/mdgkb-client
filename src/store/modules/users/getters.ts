import { GetterTree } from 'vuex';

import IUser from '@/interfaces/users/IUser';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IUser[] {
    return state.items;
  },
  item(state): IUser | undefined {
    return state.item;
  },
  emailExist(state): boolean {
    return state.emailExist;
  },
  authPageEmail(state): string {
    return state.authPageEmail;
  },
};

export default getters;
