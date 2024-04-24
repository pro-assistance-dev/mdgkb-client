import { ElLoading } from 'element-plus';
import { Ref, ref, watch } from 'vue';
import { NavigationGuardNext } from 'vue-router';

// import { CallbackFunction } from '@/interfaces/elements/elements/Callback';
import FilterModel from '@/services/classes/filters/FilterModel';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import Pagination from '@/services/classes/filters/Pagination';
import Filter from '@/services/Provider/Filter';
import Router from '@/services/Provider/Router';
import Store from '@/services/Store';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';

const Provider = (() => {
  const mounted: Ref<boolean> = ref(false);
  const form = ref();
  const saveButtonClicked: Ref<boolean> = ref(false);

  function dropPagination(): void {
    Filter.filterQuery.value.pagination = new Pagination();
    // Store.store.commit('pagination/setCurPage', 1);
  }

  // async function submit(next?: NavigationGuardNext): Promise<void> {
  //   if (Router.id()) {
  //     await Store.update();
  //   } else {
  //     await Store.create();
  //   }
  //   next ? next() : await Router.toAdmin(Strings.ToKebabCase(Store.getStoreModule()));
  // }

  async function loadItems(): Promise<void> {
    // const qid = Router.getQid();
    // await Store.store.dispatch(Store.getDispatchModuleAndAction(), { qid: qid, ftsp: Filter.filterQuery });
  }

  async function loadItem(col?: string | FilterQuery): Promise<void> {
    const { beforeWindowUnload } = useConfirmLeavePage();
    if (Router.id()) {
      if (typeof col === 'string') {
        Provider.filterQuery.value.setParams(col, Router.id() as string);
        // await Store.get(Provider.filterQuery.value);
      } else {
        // await Store.get(Router.route().params['id']);
      }
    } else {
      // Store.resetState();
    }
    window.addEventListener('beforeunload', beforeWindowUnload);
    // watch(Store.store.getters[Store.getStoreModule() + '/item'], formUpdated, { deep: true });
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
  // async function createAdmin(): Promise<void> {
  //   await Router.toAdmin(`${Strings.ToKebabCase(Store.getStoreModule())}/new`);
  // }
  //
  // async function editAdmin(id: string): Promise<void> {
  //   await Router.toAdmin(`${Strings.ToKebabCase(Store.getStoreModule())}/${id}`);
  // }
  //
  function setStoreModule(module: string | undefined = ''): void {
    if (module) {
      // Store.setModule(module);
      return;
    }
    const pathParts = Router.route().path.split('/');
    const pathLen = 1;
    if (Router.id() || pathParts[pathParts.length - 1] === 'new') {
      // pathLen = 2;
    }
    // Store.setModule(Strings.ToCamelCase(pathParts[pathParts.length - pathLen]));
  }

  async function loadingDecor(fn: any) {
    const loading = ElLoading.service({ lock: true, text: 'Загрузка' });
    await fn();
    loading.close();
  }

  type func = () => Promise<void> | void;

  async function withHeadLoader(f: func) {
    Store.Commit(`admin/setHeadSpinner`, true);
    await f();
    setTimeout(() => {
      Store.Commit(`admin/setHeadSpinner`, false);
    }, 800);
  }

  return {
    withHeadLoader,
    loadingDecor,
    dropPagination,
    saveButtonClicked,
    mounted,
    form,
    setStoreModule,
    //
    loadItem,
    ...Router,
    ...Filter,
    replaceFilterModel,
    spliceFilterModel,
  };
})();

export default Provider;
