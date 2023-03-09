import { MutationTree } from 'vuex';

import FilterModel from '@/services/classes/filters/FilterModel';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import Pagination from '@/services/classes/filters/Pagination';
import SortModel from '@/services/classes/SortModel';

import { State } from './state';

const mutations: MutationTree<State> = {
  setTrigger(state, trigger: string) {
    if (trigger == 'manual' && state.trigger == 'manual') {
      trigger = 'click';
    }
    state.trigger = trigger;
  },
  resetId(state) {
    state.filterQuery.id = undefined;
    state.filterQuery = new FilterQuery();
  },
  setStoreModule(state, storeModule: string) {
    state.storeModule = storeModule;
  },
  setAction(state, action: string) {
    state.action = action;
  },
  setOffset(state, offset: number) {
    state.filterQuery.pagination.offset = offset * state.filterQuery.pagination.limit;
  },
  setWithDeleted(state, withDeleted: boolean) {
    state.filterQuery.withDeleted = withDeleted;
  },
  resetQueryFilter(state) {
    state.filterQuery.reset();
  },
  setFilterModel(state, filterModel: FilterModel) {
    filterModel.isSet = true;
    let item = state.filterQuery.filterModels.find((i: FilterModel) => i.id === filterModel.id);
    if (item) {
      item = filterModel;
    } else {
      state.filterQuery.filterModels.push(filterModel);
    }
  },
  resetFilterModels(state) {
    state.filterQuery.filterModels = [];
  },
  replaceSortModel(state, sortModel: SortModel) {
    state.filterQuery.sortModels = [];
    state.filterQuery.sortModels.push(sortModel);
  },
  addSortModels(state, sortModels: SortModel[]) {
    state.sortModels = sortModels;
  },
  setSortModel(state, sortModel: SortModel) {
    state.filterQuery.sortModel = sortModel;
    // let item = state.filterQuery.sortModels.find((i: SortModel) => i.id === sortModel.id);
    // if (item) {
    //   item = sortModel;
    // } else {
    //   state.filterQuery.sortModels.push(sortModel);
    // }
  },
  spliceSortModel(state, id: string) {
    state.filterQuery.sortModel = undefined;
    // const index = state.filterQuery.sortModels.findIndex((i: SortModel) => i.id === id);
    // if (index > -1) state.filterQuery.sortModels.splice(index, 1);
  },
  spliceFilterModel(state, id: string) {
    const index = state.filterQuery.filterModels.findIndex((i: FilterModel) => i.id === id);
    if (index > -1) {
      state.filterQuery.filterModels.splice(index, 1);
    }
  },
  setDefaultSortModel(state) {
    state.setDefaultSortModel = !state.setDefaultSortModel;
  },
  checkSortModels(state) {
    if (state.filterQuery.sortModels.length > 0) {
      return;
    }
    const defaultSort = state.sortModels.find((sortModel: SortModel) => sortModel.default);
    if (defaultSort) {
      state.filterQuery.sortModels.push(defaultSort);
    }
  },
};

export default mutations;
