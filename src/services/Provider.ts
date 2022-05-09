import { computed, ComputedRef, Ref } from 'vue';

type CallbackFunction = () => void;
import SortModel from '@/classes/filters/SortModel';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ISortModel from '@/interfaces/filters/ISortModel';
import ISchema from '@/interfaces/schema/ISchema';

import router from '../router';
import store from '../store';
const Provider = (() => {
  const r = router;
  const s = store;
  const schema: Ref<ISchema> = computed(() => s.getters['meta/schema']);
  const filterQuery: ComputedRef<IFilterQuery> = computed(() => s.getters['filter/filterQuery']);

  function setFilterModel(model: IFilterModel): void {
    s.commit('filter/setFilterModel', model);
  }
  function setFilterModels(...models: IFilterModel[]): void {
    models.forEach((model: IFilterModel) => setFilterModel(model));
  }

  function setSortModel(model: ISortModel): void {
    s.commit('filter/setSortModel', model);
  }

  function resetFilterQuery(): void {
    s.commit(`filter/resetQueryFilter`);
  }

  function setSortModels(...models: ISortModel[]): void {
    models.forEach((model: ISortModel) => setSortModel(model));
  }

  function setLimit(limit: number): void {
    console.log(s);
    filterQuery.value.pagination.limit = limit;
  }

  function setSortModelsForOneTable(table: string, ...cols: string[]) {
    cols.forEach((col: string) => {
      setSortModel(SortModel.CreateSortModel(table, col));
    });
  }

  return {
    resetFilterQuery: resetFilterQuery,
    setSortModelsForOneTable: setSortModelsForOneTable,
    setFilterModels: setFilterModels,
    setSortModels: setSortModels,
    filterQuery: filterQuery,
    setLimit: setLimit,
    schema: schema,
    router: r,
    store: s,
  };
})();

export default Provider;
