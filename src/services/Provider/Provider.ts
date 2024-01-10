import { ElLoading } from 'element-plus';
import { computed, Ref, ref, watch } from 'vue';
import { NavigationGuardNext } from 'vue-router';

import { CallbackFunction } from '@/interfaces/elements/Callback';
import ISchema from '@/interfaces/schema/ISchema';
import FilterModel from '@/services/classes/filters/FilterModel';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import Pagination from '@/services/classes/filters/Pagination';
import Filter from '@/services/Provider/Filter';
import Router from '@/services/Provider/Router';
import StringsService from '@/services/Strings';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';

import Store from './Store';

const Provider = (() => {
  const mounted: Ref<boolean> = ref(false);
  const form = ref();
  const schema: Ref<ISchema> = computed(() => Store.store.getters['meta/schema']);
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

  async function loadItems(): Promise<void> {
    const qid = Router.getQid();
    await Store.store.dispatch(Store.getDispatchModuleAndAction(), { qid: qid, ftsp: Filter.filterQuery });
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

  async function replaceFilterModel(newFilterModel: FilterModel, previousFilterModelId: string | undefined) {
    Filter.filterQuery.value.spliceFilterModel(previousFilterModelId);
    Filter.filterQuery.value.setFilterModel(newFilterModel);
    await Provider.router.replace({ query: {} });
  }

  async function spliceFilterModel(id: string | undefined) {
    Filter.filterQuery.value.spliceFilterModel(id);
    await Provider.router.replace({ query: {} });
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
    await Store.store.dispatch(`${module}/getAll`, { filterQuery: Provider.filterQuery.value });
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

  async function loadingDecor(fn: CallbackFunction) {
    const loading = ElLoading.service({ lock: true, text: 'Загрузка' });
    await fn();
    loading.close();
  }

  return {
    loadingDecor,
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
    replaceFilterModel,
    spliceFilterModel,
  };
})();

export default Provider;
