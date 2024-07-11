import { onBeforeMount } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import AdminHeaderParams from '@/services/classes/admin/AdminHeaderParams';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import { SortModelBuildersLib } from '@/services/interfaces/Sort';
import Provider from '@/services/Provider/Provider';
import SortList from '@/services/SortList';
// import Store from '@/services/Store';
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
      FTSP.Get().reset();
      SortList.Set(options?.sortsLib);
      FTSP.Get().setSortModel(SortList.GetDefault());
      Provider.setStoreModule(undefined);
      // Provider.setGetAction(options?.getAction);
      // Provider.initPagination(options?.pagination);
      //
      PHelp.Paginator.storeModule = options?.pagination?.storeModule;
      Store.Commit('pagination/setCurPage', 1);

      await f();
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
        PHelp.Notification.Success('Сохранено');
      } catch (error) {
        PHelp.Notification.Success('Что-то пошло не так');
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
