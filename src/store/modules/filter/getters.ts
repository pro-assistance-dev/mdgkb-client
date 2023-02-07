import { GetterTree } from 'vuex';

import SortModel from '@/classes/filters/SortModel';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ISortModel from '@/interfaces/filters/ISortModel';
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
    // if (!state.filterQuery.limit) {
    //   state.filterQuery.limit = 25;
    // }
    return state.filterQuery;
  },
  action(state): string {
    return state.action;
  },
  allLoaded(state): boolean {
    return state.filterQuery.allLoaded;
  },
  sortModels(state): ISortModel[] {
    return state.sortModels;
  },
  defaultSortModel(state): ISortModel | undefined {
    return state.sortModels.find((sortModel: ISortModel) => sortModel.default);
  },
  setDefaultSortModel(state): boolean {
    return state.setDefaultSortModel;
  },
  sortModel(state): SortModel {
    console.log(state.filterQuery.sortModels);
    const selected = state.filterQuery.sortModels.find((s: SortModel) => s.selected);
    if (selected) {
      return selected;
    }
    return state.filterQuery.sortModels[0];
  },
};

export default getters;
