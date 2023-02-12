import { computed, ComputedRef, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, RouteLocationNormalizedLoaded } from 'vue-router';

import FilterQuery from '@/classes/filters/FilterQuery';
import SortModel from '@/classes/filters/SortModel';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import ISchema from '@/interfaces/schema/ISchema';
import { IPaginationOptions } from '@/services/Hooks/Hooks';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';

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

  let storeModule = '';
  let getAction = '';

  function initPagination(options?: IPaginationOptions): void {
    store.commit('filter/setStoreModule', options?.storeModule ?? getStoreModule());
    store.commit('filter/setAction', options?.action ?? getGetAction());
    store.commit('pagination/setCurPage', 1);
  }

  // function getItems<T>(): ComputedRef<T> {
  //   return computed(() => store.getters[storeModule + '/items']);
  // }

  const item = computed(() => store.getters[storeModule + '/item']);
  const items = computed(() => store.getters[storeModule + '/items']);

  // function getItem<T>(): ComputedRef<T> {
  //   return
  // }

  function getStoreModule(): string {
    return storeModule;
  }

  async function loadItems(): Promise<void> {
    return await store.dispatch(`${storeModule}/${getAction}`, filterQuery.value);
  }

  async function submit(next?: NavigationGuardNext): Promise<void> {
    if (route().params['id']) {
      await store.dispatch(`${storeModule}/update`, item.value);
    } else {
      await store.dispatch(`${storeModule}/create`, item.value);
    }
    next ? next() : await Provider.router.push(`/admin/${storeModule}`);
  }

  async function loadItem(): Promise<void> {
    const { beforeWindowUnload, formUpdated } = useConfirmLeavePage();
    if (route().params['id']) {
      await Provider.store.dispatch(`${storeModule}/get`, route().params['id']);
    } else {
      Provider.store.commit(`${storeModule}/resetState`);
    }
    window.addEventListener('beforeunload', beforeWindowUnload);
    watch(item, formUpdated, { deep: true });
  }

  function setGetAction(action: string | undefined = 'getAll'): void {
    getAction = action;
  }

  function getGetAction(): string {
    return getAction;
  }

  async function createAdmin(): Promise<void> {
    await router.push(`/admin/${storeModule}/new`);
  }

  async function editAdmin(id: string): Promise<void> {
    await router.push(`/admin/${storeModule}/${id}`);
  }

  async function remove(id: string): Promise<void> {
    return await store.dispatch(`${storeModule}/remove`, id);
  }

  function getAdminLib() {
    return {
      items,
      item,
      loadItems,
      create: createAdmin,
      edit: editAdmin,
      remove,
      mounted: mounted,
      schema: schema,
      sortList: sortList,
    };
  }

  function setStoreModule(module: string | undefined = ''): void {
    if (module) {
      storeModule = module;
      return;
    }
    const pathParts = route().path.split('/');
    const pathLen = route().params['id'] ? 2 : 1;
    storeModule = pathParts[pathParts.length - pathLen];
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
    filterQuery.value.reset();
    sortList.value = [];
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
    setDefaultSortModel,
    //
    getStoreModule,
    setStoreModule,
    setGetAction,
    getGetAction,
    items,
    createAdmin,
    editAdmin,
    remove,
    getAdminLib,
    loadItems,
    initPagination,
    loadItem,
    item,
    submit,
  };
})();

export default Provider;
