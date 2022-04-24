import { GetterTree } from 'vuex';

import IUser from '@/interfaces/IUser';
import FavouriteService from '@/services/Favourite';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IUser[] {
    return state.items;
  },
  item(state): IUser | undefined {
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
