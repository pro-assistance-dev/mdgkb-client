import { ElMessage } from 'element-plus';
import { onBeforeMount } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import IAdminHeaderParams from '@/interfaces/admin/IAdminHeaderParams';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ISortModel from '@/interfaces/filters/ISortModel';
import Provider from '@/services/Provider';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';

export interface IHooksOptions {
  pagination?: IPaginationOptions;
  sortModels: ISortModel[];
  adminHeader?: IAdminHeaderParams;
}

export interface IPaginationOptions {
  storeModule: string;
  action: string;
}

type func = (filterQuery: IFilterQuery) => void;
type asyncFunc = () => Promise<void>;

const Hooks = (() => {
  // const filterQuery: ComputedRef<IFilterQuery> = computed(() => Provider.store.getters['filter/filterQuery']);
  const onBeforeMountWithLoading = (f: func, options?: IHooksOptions) => {
    return onBeforeMount(async () => {
      // Provider.mounted.value = false;
      // Provider.store.commit('admin/showLoading');
      // Provider.store.commit(`filter/resetQueryFilter`);
      // await Provider.store.dispatch('meta/getSchema');
      // if (options?.pagination) {
      //   Provider.store.commit('filter/setStoreModule', options.pagination.storeModule);
      //   Provider.store.commit('filter/setAction', options.pagination.action);
      //   Provider.store.commit('pagination/setCurPage', 1);
      // }
      // if (options?.adminHeader) {
      //   Provider.store.commit('admin/setHeaderParams', options.adminHeader);
      // }
      // if (Provider.filterQuery.value) {
      //   Provider.filterQuery.value.pagination.cursorMode = false;
      // }
      // await f(Provider.filterQuery.value);
      //
      // Provider.store.commit('admin/closeLoading');
      // Provider.mounted.value = true;
    });
  };

  const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

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
