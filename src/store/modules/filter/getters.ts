import { GetterTree } from 'vuex';

import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  trigger(state): string {
    return state.trigger;
  },
  storeModule(state): string {
    return state.storeModule;
  },
  filterQuery(state): IFilterQuery {
    if (!state.filterQuery.limit) {
      state.filterQuery.limit = 25;
    }
    return state.filterQuery;
  },
  action(state): string {
    return state.action;
  },
  allLoaded(state): boolean {
    return state.filterQuery.allLoaded;
  },
};

export default getters;
