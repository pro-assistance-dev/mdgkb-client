import { GetterTree } from 'vuex';

import User from '@/classes/User';
import FavouriteService from '@/services/Favourite';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): User[] {
    return state.items;
  },
  item(state): User | undefined {
    return state.item;
  },
  emailExists(state): boolean {
    return state.emailExists;
  },
  authPageEmail(state): string {
    return state.authPageEmail;
  },
  isFavourite(state) {
    return (domain: string, id: string) => FavouriteService.isFavourite(domain, id);
  },
  count(state): number {
    return state.count;
  },
};

export default getters;
