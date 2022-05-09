import { onBeforeMount } from 'vue';

import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ISortModel from '@/interfaces/filters/ISortModel';
import Provider from '@/services/Provider';

export interface IHooksOptions {
  pagination?: IPaginationOptions;
  sortModels: ISortModel[];
}

export interface IPaginationOptions {
  storeModule: string;
  action: string;
}

type func = (filterQuery: IFilterQuery) => void;

const Hooks = (() => {
  // const filterQuery: ComputedRef<IFilterQuery> = computed(() => Provider.store.getters['filter/filterQuery']);
  const onBeforeMountWithLoading = (f: func, options?: IHooksOptions) => {
    return onBeforeMount(async () => {
      Provider.store.commit('admin/showLoading');
      Provider.store.commit(`filter/resetQueryFilter`);
      await Provider.store.dispatch('meta/getSchema');
      if (options?.pagination) {
        Provider.store.commit('filter/setStoreModule', options.pagination.storeModule);
        Provider.store.commit('filter/setAction', options.pagination.action);
        Provider.store.commit('pagination/setCurPage', 1);
      }
      if (options && options.sortModels.length > 0) {
        Provider.store.commit('filter/replaceSortModel', options.sortModels[0]);
      }
      if (Provider.filterQuery.value) {
        Provider.filterQuery.value.pagination.cursorMode = false;
      }
      await f(Provider.filterQuery.value);

      Provider.store.commit('admin/closeLoading');
    });
  };

  return {
    onBeforeMount: onBeforeMountWithLoading,
  };
})();

export default Hooks;
