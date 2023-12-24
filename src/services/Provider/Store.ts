import { IPaginationOptions } from '@/services/Hooks/Hooks';
import StringsService from '@/services/Strings';

import store from '../../store';

const Store = (() => {
  const s = store;
  let getAction = '';
  let storeModule = '';
  function initPagination(options?: IPaginationOptions): void {
    store.commit('filter/setStoreModule', options?.storeModule ?? getStoreModule());
    store.commit('filter/setAction', options?.action ?? getGetAction());
    store.commit('pagination/setCurPage', 1);
  }

  function setGetAction(action: string | undefined = 'getAll'): void {
    getAction = action;
  }

  function getGetAction(): string {
    return getAction;
  }

  function getStoreModule(): string {
    return storeModule;
  }

  function getDispatchModuleAndAction(): string {
    return getStoreModule() + '/' + getGetAction();
  }

  function resetState(): void {
    if (storeModule === '') {
      return;
    }
    store.commit(`${storeModule}/resetState`);
  }

  function setModule(module: string): void {
    storeModule = module;
  }

  async function loadItems(): Promise<void> {
    return await Store.store.dispatch(`${Store.getStoreModule()}/${getGetAction()}`, s.getters['filter/filterQuery']);
  }

  async function create(): Promise<void> {
    return store.dispatch(`${storeModule}/create`, store.getters[storeModule + '/item']);
  }

  async function update(): Promise<void> {
    console.log(store.getters[storeModule + '/item']);
    return store.dispatch(`${storeModule}/update`, store.getters[storeModule + '/item']);
  }

  async function get(param: unknown): Promise<void> {
    await store.dispatch(`${storeModule}/get`, param);
  }

  async function remove(id: string): Promise<void> {
    return await store.dispatch(`${StringsService.toKebabCase(getStoreModule())}/remove`, id);
  }

  return {
    store: s,
    setGetAction,
    getGetAction,
    setModule,
    getStoreModule,
    initPagination,
    resetState,

    // СRUD
    loadItems,
    create,
    update,
    get,
    remove,
    getDispatchModuleAndAction,
  };
})();

export default Store;
