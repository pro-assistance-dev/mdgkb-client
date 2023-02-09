import { ElMessage } from 'element-plus';
import { onBeforeMount } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import AdminHeaderParams from '@/classes/admin/AdminHeaderParams';
import FilterQuery from '@/classes/filters/FilterQuery';
import createSortModels, { ISortModelBuildersLib } from '@/services/CreateSortModels';
import Provider from '@/services/Provider';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export interface IHooksOptions {
  pagination?: IPaginationOptions;
  sortsLib?: ISortModelBuildersLib;
  adminHeader?: AdminHeaderParams;
  getAction?: string;
  v2?: boolean;
}

export interface IPaginationOptions {
  storeModule: string;
  action: string;
}

type func = (filterQuery: FilterQuery) => void;

const Hooks = (() => {
  const onBeforeMountWithLoading = (f: func, options?: IHooksOptions) => {
    return onBeforeMount(async () => {
      Provider.mounted.value = false;
      Provider.store.commit('admin/showLoading');
      Provider.resetFilterQuery();
      await Provider.store.dispatch('meta/getSchema');
      if (options?.adminHeader) {
        Provider.store.commit('admin/setHeaderParams', options.adminHeader);
      }
      if (Provider.filterQuery.value) {
        Provider.filterQuery.value.pagination.cursorMode = false;
      }
      if (options?.sortsLib || options?.v2) {
        await Provider.filterQuery.value.fromUrlQuery(Provider.route().query);
        if (options.sortsLib) {
          Provider.setSortList(...createSortModels(options.sortsLib));
        }
        if (!Provider.filterQuery.value.sortModel) {
          Provider.setDefaultSortModel();
        }
        Provider.setStoreModule();
        Provider.setGetAction(options.getAction);
        console.log(Provider.getStoreModule(), Provider.getGetAction());
        Provider.store.commit('filter/setStoreModule', Provider.getStoreModule());
        Provider.store.commit('filter/setAction', Provider.getGetAction());
        Provider.store.commit('pagination/setCurPage', 1);
      }
      if (options?.pagination) {
        Provider.store.commit('filter/setStoreModule', options.pagination.storeModule);
        Provider.store.commit('filter/setAction', options.pagination.action);
        Provider.store.commit('pagination/setCurPage', 1);
      }
      await f(Provider.filterQuery.value);
      Provider.store.commit('admin/closeLoading');
      Provider.mounted.value = true;
    });
  };

  const { saveButtonClick, showConfirmModal } = useConfirmLeavePage();

  const onBeforeRouteLeaveWithSubmit = (submitFunction: CallableFunction) => {
    return onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submitFunction(), next);
    });
  };

  const submit = (submitFunction: CallableFunction) => {
    return async () => {
      saveButtonClick.value = true;
      if (!validate(Provider.form)) {
        saveButtonClick.value = false;
        return;
      }
      try {
        await submitFunction();
        ElMessage({ message: 'Сохранено', type: 'success' });
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        console.log(error);
        return;
      }
    };
  };

  return {
    onBeforeMount: onBeforeMountWithLoading,
    onBeforeRouteLeave: onBeforeRouteLeaveWithSubmit,
    submit,
  };
})();

export default Hooks;
