import { computed, ComputedRef, Ref, ref } from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';

import FilterQuery from '@/classes/filters/FilterQuery';
import SortModel from '@/classes/filters/SortModel';
import IFilterModel from '@/interfaces/filters/IFilterModel';
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
  const filterQuery: ComputedRef<FilterQuery> = computed(() => s.getters['filter/filterQuery']);
  const sortList: Ref<SortModel[]> = ref([]);

  function filterQueryToUrl(): void {
    filterQuery.value.toUrlQuery;
  }

  async function getAll(module: string): Promise<void> {
    await s.dispatch(`${module}/getAll`, filterQuery.value);
  }

  function setFilterModel(model: IFilterModel): void {
    s.commit('filter/setFilterModel', model);
  }
  function setFilterModels(...models: IFilterModel[]): void {
    models.forEach((model: IFilterModel) => setFilterModel(model));
  }

  function setSortList(...models: SortModel[]): void {
    sortList.value = models;
  }

  function setSortModel(model: SortModel): void {
    s.commit('filter/setSortModel', model);
  }

  function resetFilterQuery(): void {
    s.commit(`filter/resetQueryFilter`);
  }

  function setSortModels(...models: SortModel[]): void {
    models.forEach((model: SortModel) => setSortModel(model));
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

  let sseReconnectCount = 0;
  const maxReconnectCount = 100;
  type f = (e: MessageEvent) => void;
  async function handlerSSE<T>(query: string, storeModule?: string, funcForMessage?: f): Promise<EventSource> {
    if (!storeModule) {
      storeModule = query;
    }
    const c = new HttpClient('subscribe');
    let source = await c.subscribe<T>({ query: query });
    const defaultFunc = function (e: MessageEvent) {
      Provider.store.commit(`${storeModule}/unshiftToAll`, JSON.parse(e.data));
    };

    const f = (e: MessageEvent) => {
      if (funcForMessage) {
        funcForMessage(e);
      } else {
        defaultFunc(e);
      }
    };
    source.onmessage = f;

    source.onerror = function (e) {
      console.log(e);
      console.log('onError', sseReconnectCount);
      setTimeout(async () => {
        source.close();
        sseReconnectCount++;
        if (sseReconnectCount > maxReconnectCount) {
          sseReconnectCount = 0;

          return;
        }
        source = await handlerSSE(query, storeModule);
      }, sseReconnectCount * 10000);
    };

    return source;
  }

  function routerPushBlank(path: string): void {
    const route = r.resolve({ path: path });
    window.open(route.href, '_blank');
  }

  function getPath(): string {
    const arr = route().path.split('/');
    return arr[arr.length - 1];
  }

  return {
    routerPushBlank,
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
    getPath,
  };
})();

export default Provider;
