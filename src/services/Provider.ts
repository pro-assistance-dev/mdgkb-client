import { computed, ComputedRef, Ref, ref } from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';

import SortModel from '@/classes/filters/SortModel';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ISortModel from '@/interfaces/filters/ISortModel';
import ISchema from '@/interfaces/schema/ISchema';

import router from '../router';
import store from '../store';
import HttpClient from './HttpClient';

const Provider = (() => {
  const r = router;
  const s = store;
  const mounted: Ref<boolean> = ref(false);
  const form = ref();
  const schema: Ref<ISchema> = computed(() => s.getters['meta/schema']);
  const filterQuery: ComputedRef<IFilterQuery> = computed(() => s.getters['filter/filterQuery']);
  const sortList: Ref<ISortModel[]> = ref([]);

  async function getAll(module: string): Promise<void> {
    await s.dispatch(`${module}/getAll`, filterQuery.value);
  }

  function setFilterModel(model: IFilterModel): void {
    s.commit('filter/setFilterModel', model);
  }
  function setFilterModels(...models: IFilterModel[]): void {
    models.forEach((model: IFilterModel) => setFilterModel(model));
  }

  function setSortList(...models: ISortModel[]): void {
    sortList.value = models;
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
    filterQuery.value.pagination.limit = limit;
  }

  function setSortModelsForOneTable(table: string, ...cols: string[]) {
    cols.forEach((col: string) => {
      setSortModel(SortModel.CreateSortModel(table, col));
    });
  }

  function spliceFilterModel(id: string | undefined): void {
    s.commit('filter/spliceFilterModel', id);
  }

  function replaceFilterModel(newFilterModel: IFilterModel, previousFilterModelId: string | undefined) {
    spliceFilterModel(previousFilterModelId);
    setFilterModel(newFilterModel);
  }

  function route(): RouteLocationNormalizedLoaded {
    return router.currentRoute.value;
  }

  async function handlerSSE<T>(query: string, storeModule?: string): Promise<EventSource> {
    if (!storeModule) {
      storeModule = query;
    }
    const c = new HttpClient('subscribe');
    const source = await c.subscribe<T>({ query: query });
    source.onmessage = function (e) {
      Provider.store.commit(`${storeModule}/unshiftToAll`, JSON.parse(e.data));
    };
    source.onerror = function (e) {
      handlerSSE(query, storeModule);
    };
    return source;
  }

  return {
    setSortList,
    sortList,
    mounted,
    resetFilterQuery,
    setSortModelsForOneTable,
    setFilterModels,
    setFilterModel,
    setSortModels,
    spliceFilterModel,
    filterQuery,
    setLimit: setLimit,
    schema,
    router: r,
    store: s,
    replaceFilterModel,
    form,
    getAll,
    route,
    handlerSSE,
  };
})();

export default Provider;
