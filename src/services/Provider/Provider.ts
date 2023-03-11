import { computed, ComputedRef, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, RouteLocationNormalizedLoaded } from 'vue-router';

import ISchema from '@/interfaces/schema/ISchema';
import router from '@/router';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import Pagination from '@/services/classes/filters/Pagination';
import Filter from '@/services/Provider/Filter';
import Router from '@/services/Provider/Router';
import StringsService from '@/services/Strings';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import store from '@/store';

import Store from './Store';

const Provider = (() => {
  const mounted: Ref<boolean> = ref(false);
  const form = ref();
  const schema: Ref<ISchema> = computed(() => Store.store.getters['meta/schema']);
  const r = router;
  const s = store;
  const saveButtonClicked: Ref<boolean> = ref(false);

  function dropPagination(): void {
    Filter.filterQuery.value.pagination = new Pagination();
    Store.store.commit('pagination/setCurPage', 1);
  }

  async function submit(next?: NavigationGuardNext): Promise<void> {
    if (Router.id()) {
      await Store.update();
    } else {
      await Store.create();
    }
    next ? next() : await Router.toAdmin(StringsService.toKebabCase(Store.getStoreModule()));
  }

  async function loadItem(col?: string | FilterQuery): Promise<void> {
    const { beforeWindowUnload, formUpdated } = useConfirmLeavePage();
    if (Router.id()) {
      if (typeof col === 'string') {
        Provider.filterQuery.value.setParams(col, Router.id() as string);
        await Store.get(Provider.filterQuery.value);
      } else {
        await Store.get(Router.route().params['id']);
      }
    } else {
      Store.resetState();
    }
    window.addEventListener('beforeunload', beforeWindowUnload);
    watch(Store.store.getters[Store.getStoreModule() + '/item'], formUpdated, { deep: true });
  }

  async function createAdmin(): Promise<void> {
    await Router.toAdmin(`${StringsService.toKebabCase(Store.getStoreModule())}/new`);
  }

  async function editAdmin(id: string): Promise<void> {
    await Router.toAdmin(`${StringsService.toKebabCase(Store.getStoreModule())}/${id}`);
  }

  function setStoreModule(module: string | undefined = ''): void {
    if (module) {
      Store.setModule(module);
      return;
    }
    const pathParts = Router.route().path.split('/');
    let pathLen = 1;
    if (Router.id() || pathParts[pathParts.length - 1] === 'new') {
      pathLen = 2;
    }
    Store.setModule(StringsService.toCamelCase(pathParts[pathParts.length - pathLen]));
  }

  async function getAll(module?: string): Promise<void> {
    if (!module) {
      module = Store.getStoreModule();
    }
    await Store.store.dispatch(`${module}/getAll`, Provider.filterQuery.value);
  }

  function getAdminLib() {
    return {
      loadItems: Store.loadItems,
      create: createAdmin,
      edit: editAdmin,
      remove: Store.remove,
      mounted: mounted,
      schema: schema,
      sortList: Filter.sortList,
    };
  }

  return {
    dropPagination,
    saveButtonClicked,
    mounted,
    schema,
    form,
    getAll,
    setStoreModule,
    //
    createAdmin,
    editAdmin,
    getAdminLib,
    loadItem,
    submit,
    ...Store,
    ...Router,
    ...Filter,
    router: r,
    store: s,
  };
})();

export default Provider;
