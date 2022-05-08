import { computed, ComputedRef, Ref } from 'vue';

type CallbackFunction = () => void;
import SortModel from '@/classes/filters/SortModel';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ISortModel from '@/interfaces/filters/ISortModel';
import ISchema from '@/interfaces/schema/ISchema';

import router from '../router/index';
import store from '../store/index';
const Provider = (() => {
  const r = router;
  const s = store;
  const schema: Ref<ISchema> = computed(() => s.getters['meta/schema']);
  const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);

  function setFilterModel(model: IFilterModel): void {
    s.commit('filter/setFilterModel', model);
  }

  function setSortModel(model: ISortModel): void {
    s.commit('filter/setSortModel', model);
  }

  function setSortModels(...models: ISortModel[]): void {
    models.forEach((model: ISortModel) => setSortModel(model));
  }

  function setSortModelsForOneTable(table: string, ...cols: string[]) {
    cols.forEach((col: string) => {
      setSortModel(SortModel.CreateSortModel(table, col));
    });
  }

  return {
    setSortModelsForOneTable: setSortModelsForOneTable,
    setFilterModel: setFilterModel,
    setSortModel: setSortModel,
    setSortModels: setSortModels,
    filterQuery: filterQuery,
    schema: schema,
    router: r,
    store: s,
  };
})();

export default Provider;
