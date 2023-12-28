import { computed, ComputedRef, Ref, ref } from 'vue';

import FilterModel from '@/services/classes/filters/FilterModel';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import SortModel from '@/services/classes/SortModel';
import Store from '@/services/Provider/Store';

const Filter = (() => {
  const sortList: Ref<SortModel[]> = ref([]);
  const filterQuery: ComputedRef<FilterQuery> = computed(() => Store.store.getters['filter/filterQuery']);

  function setSortList(...models: SortModel[]): void {
    sortList.value = models;
    setDefaultSortModel();
  }

  function setDefaultSortModel(): void {
    if (filterQuery.value.sortModel) {
      return;
    }
    const defaultSortModel = sortList.value.find((sortModel: SortModel) => sortModel.default);
    if (defaultSortModel) {
      filterQuery.value.sortModel = defaultSortModel;
    }
  }

  function resetFilterQuery(): void {
    filterQuery.value.reset();
    sortList.value = [];
  }

  function setLimit(limit: number): void {
    filterQuery.value.pagination.limit = limit;
  }

  function setSortModel(model: SortModel): void {
    filterQuery.value.sortModel = model;
    filterQuery.value.sortModels.push(model);
  }

  function setSortModels(...models: SortModel[]): void {
    models.forEach((model: SortModel) => setSortModel(model));
  }

  function setSortModelsForOneTable(table: string, ...cols: string[]) {
    cols.forEach((col: string) => {
      setSortModel(SortModel.CreateSortModel(table, col));
    });
  }

  function setFilterModels(...models: FilterModel[]): void {
    models.forEach((model: FilterModel) => filterQuery.value.setFilterModel(model));
  }

  function replaceFilterModel(newFilterModel: FilterModel, previousFilterModelId: string | undefined) {
    filterQuery.value.spliceFilterModel(previousFilterModelId);
    filterQuery.value.setFilterModel(newFilterModel);
  }

  function setFilterModel(f: FilterModel) {
    filterQuery.value.setFilterModel(f);
  }

  function spliceFilterModel(id: string | undefined) {
    filterQuery.value.spliceFilterModel(id);
  }

  function setQid(qid: string) {
    filterQuery.value.id = qid;
  }

  return {
    setQid,
    sortList,
    filterQuery,

    setSortList,
    setDefaultSortModel,
    resetFilterQuery,
    setLimit,
    setSortModel,
    setSortModels,
    setSortModelsForOneTable,
    replaceFilterModel,
    setFilterModel,
    setFilterModels,
    spliceFilterModel,
  };
})();

export default Filter;
