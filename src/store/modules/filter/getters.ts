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
    return state.filterQuery;
  },
  storeAction(state): string {
    return state.storeAction;
  },
};

export default getters;
