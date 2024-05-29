import { ComputedRef } from 'vue';

import FilterModel from '@/services/classes/filters/FilterModel';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import Pagination from '@/services/classes/filters/Pagination';
import SortModel from '@/services/classes/SortModel';
import Store from '@/services/Store';

import FTSP from '../classes/filters/FTSP';

const Filter = (() => {
  let sortList: SortModel[] = [];
  const filterQuery: ComputedRef<FilterQuery> = Store.Getters('filter/filterQuery');
  const ftsp: ComputedRef<FTSP> = Store.Getters('filter/ftsp');

  function getPagination(): Pagination {
    return ftsp.value.p;
  }

  function findFilterModel(filterModels: FilterModel[]): FilterModel | undefined {
    let fmFromFilterQuery = filterModels.find((f: FilterModel) => filterQuery.value.findFilterModel(f));
    if (fmFromFilterQuery) {
      return fmFromFilterQuery;
    }

    fmFromFilterQuery = filterModels.find((f: FilterModel) => ftsp.value.findFilterModel(f));
    return fmFromFilterQuery;
  }

  function resetFilterQuery(): void {
    filterQuery.value.reset();
    sortList = [];
  }

  function setLimit(limit: number): void {
    filterQuery.value.pagination.limit = limit;
  }

  // function setSortModelsForOneTable(table: string, ...cols: string[]) {
  //   cols.forEach((col: string) => {
  //     setSortModel(SortModel.Create(table, col));
  //   });
  // }

  function setFilterModels(...models: FilterModel[]): void {
    models.forEach((model: FilterModel) => filterQuery.value.setFilterModel(model));
  }

  function setFilterModel(f: FilterModel) {
    filterQuery.value.setFilterModel(f);
  }

  function setQid(qid: string) {
    filterQuery.value.id = qid;
  }

  return {
    setQid,
    sortList,
    filterQuery,
    ftsp,
    resetFilterQuery,
    setLimit,
    setFilterModel,
    findFilterModel,
    setFilterModels,
    getPagination,
  };
})();

export default Filter;
