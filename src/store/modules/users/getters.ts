import { GetterTree } from 'vuex';

import RootState from '@/store/types';

import { State } from './state';
import IBuilding from '@/interfaces/buildings/IBuilding';
import IUser from '@/interfaces/users/IUser';

const getters: GetterTree<State, RootState> = {
  users(state): IUser[] | undefined {
    return state.users;
  },
  user(state): IUser | undefined {
    return state.user;
  },
  emailExist(state): boolean {
    return state.emailExist;
  },
};

export default getters;
