import { GetterTree } from 'vuex';

import FilterQuery from '@/services/classes/filters/FilterQuery';
import SortModel from '@/services/classes/SortModel';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  trigger(state): string {
    return state.trigger;
  },
  storeModule(state): string {
    return state.storeModule;
  },
  filterQuery(state): FilterQuery {
    return state.filterQuery;
  },
  action(state): string {
    return state.action;
  },
  allLoaded(state): boolean {
    return state.filterQuery.pagination.allLoaded;
  },
  sortModels(state): SortModel[] {
    return state.sortModels;
  },
  defaultSortModel(state): SortModel | undefined {
    return state.sortModels.find((sortModel: SortModel) => sortModel.default);
  },
  setDefaultSortModel(state): boolean {
    return state.setDefaultSortModel;
  },
  sortModel(state): SortModel {
    const selected = state.filterQuery.sortModels.find((s: SortModel) => s.selected);
    if (selected) {
      return selected;
    }
    return state.filterQuery.sortModels[0];
  },
};

export default getters;
