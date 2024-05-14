import { ElMessage } from 'element-plus';
import { onBeforeMount } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import AdminHeaderParams from '@/services/classes/admin/AdminHeaderParams';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import SortModel from '@/services/classes/SortModel';
import createSortModels from '@/services/CreateSortModels';
import { SortModelBuildersLib } from '@/services/interfaces/Sort';
import Provider from '@/services/Provider/Provider';
import Store from '@/services/Store';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';
export interface IHooksOptions {
  pagination?: IPaginationOptions;
  sortsLib?: SortModelBuildersLib;
  adminHeader?: AdminHeaderParams;
  getAction?: string;
  v2?: boolean;
}

export interface IPaginationOptions {
  storeModule: string;
  action: string;
}

type func = (param?: FilterQuery | string) => Promise<void> | void;

const Hooks = (() => {
  const onBeforeMountWithLoading = (f: func, options?: IHooksOptions) => {
    return onBeforeMount(async () => {
      Provider.mounted.value = false;
      Store.Commit('admin/showLoading');
      Provider.ftsp.value.reset();
      // await Provider.store.dispatch('meta/getSchema');
      if (options?.sortsLib) {
        const sortModels = createSortModels(options.sortsLib);
        Provider.sortList = sortModels;
        const defaultSortModel = sortModels.find((s: SortModel) => s.default);
        if (defaultSortModel) {
          Provider.ftsp.value.setSortModel(defaultSortModel);
        }
      }
      // await Proider.filterQuery.value.fromUrlQuery(Provider.route().query);
      // Provider.setDefaultSortModel();
      Provider.setStoreModule(undefined);
      // Provider.setGetAction(options?.getAction);
      // Provider.initPagination(options?.pagination);
      //
      Store.Commit('filter/setStoreModule', options?.pagination?.storeModule);
      Store.Commit('filter/setAction', options?.pagination?.action);
      Store.Commit('pagination/setCurPage', 1);

      await f();
      if ((options?.adminHeader, options?.adminHeader)) {
        Store.Commit('admin/setHeaderParams', options.adminHeader);
      }
      Store.Commit('admin/closeLoading');
      Provider.mounted.value = true;
    });
  };

  const { saveButtonClick, showConfirmModal } = useConfirmLeavePage();

  const onBeforeRouteLeaveWithSubmit = (submitFunction?: CallableFunction) => {
    return onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      const func = submitFunction ? submitFunction : submit;
      showConfirmModal(func(), next);
      // Provider.resetState();
    });
  };
  const submit = (submitFunction?: CallableFunction) => {
    return async () => {
      Provider.saveButtonClicked.value = true;
      saveButtonClick.value = true;
      if (!validate(Provider.form)) {
        saveButtonClick.value = false;
        return;
      }
      try {
        if (submitFunction) {
          await submitFunction();
        } else {
          // await Provider.submit();
        }
        ElMessage({ message: 'Сохранено', type: 'success' });
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        console.log(error);
        return;
      }
      Provider.saveButtonClicked.value = false;
    };
  };

  return {
    onBeforeMount: onBeforeMountWithLoading,
    onBeforeRouteLeave: onBeforeRouteLeaveWithSubmit,
    submit,
  };
})();

export default Hooks;
