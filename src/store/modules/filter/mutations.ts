import { MutationTree } from 'vuex';

import FilterQuery from '@/classes/filters/FilterQuery';
import Pagination from '@/classes/filters/Pagination';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import ISortModel from '@/interfaces/filters/ISortModel';

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
    state.filterQuery.offset = offset;
  },
  setWithDeleted(state, withDeleted: boolean) {
    state.filterQuery.withDeleted = withDeleted;
  },
  resetQueryFilter(state) {
    state.filterQuery.filterModels.forEach((filterModel: IFilterModel) => {
      filterModel.isSet = false;
      filterModel.value1 = '';
      filterModel.date1 = undefined;
      filterModel.date2 = undefined;
      filterModel.boolean = false;
      filterModel.set = [];
    });
    // state.filterQuery.sortModels.forEach((sortModel: ISortModel) => {
    //   sortModel.order = undefined;
    // });
    state.filterQuery.pagination = new Pagination();
    state.filterQuery.filterModels = [];
    state.filterQuery.allLoaded = false;
    state.filterQuery.sortModels = [];
  },
  setFilterModel(state, filterModel: IFilterModel) {
    filterModel.isSet = true;
    let item = state.filterQuery.filterModels.find((i: IFilterModel) => i.id === filterModel.id);
    if (item) {
      item = filterModel;
    } else {
      state.filterQuery.filterModels.push(filterModel);
    }
  },
  replaceSortModel(state, sortModel: ISortModel) {
    state.filterQuery.sortModels = [];
    state.filterQuery.sortModels.push(sortModel);
  },
  setSortModel(state, sortModel: ISortModel) {
    let item = state.filterQuery.sortModels.find((i: ISortModel) => i.id === sortModel.id);
    if (item) {
      item = sortModel;
    } else {
      state.filterQuery.sortModels.push(sortModel);
    }
  },
  spliceSortModel(state, id: string) {
    const index = state.filterQuery.sortModels.findIndex((i: ISortModel) => i.id === id);
    if (index > -1) state.filterQuery.sortModels.splice(index, 1);
  },
  spliceFilterModel(state, id: string) {
    const index = state.filterQuery.filterModels.findIndex((i: IFilterModel) => i.id === id);
    console.log(index);
    if (index > -1) {
      state.filterQuery.filterModels.splice(index, 1);
    }
  },
};

export default mutations;
