import { onBeforeMount } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import AdminHeaderParams from '@/services/classes/admin/AdminHeaderParams';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import { SortModelBuildersLib } from '@/services/interfaces/Sort';
import SortList from '@/services/SortList';
import SortListConst from '@/services/SortList';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';

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
      FTSP.Get().reset();
      SortList.Set(options?.sortsLib);
      FTSP.Get().setSortModel(SortList.GetDefault());
      SortListConst.Set(options?.sortsLib);
      FTSP.Get().setSortModel(SortListConst.GetDefault());

      PHelp.Paginator.storeModule = options?.pagination?.storeModule;

      await f();
    });
  };

  const { saveButtonClick, showConfirmModal } = useConfirmLeavePage();

  const onBeforeRouteLeaveWithSubmit = (submitFunction?: CallableFunction) => {
    return onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      const func = submitFunction ? submitFunction : submit;
      showConfirmModal(func(), next);
    });
  };
  const submit = (submitFunction?: CallableFunction) => {
    return async () => {
      saveButtonClick.value = true;
      // if (!validate()) {
      //   saveButtonClick.value = false;
      //   return;
      // }
      try {
        if (submitFunction) {
          await submitFunction();
        }
        PHelp.Notification.Success('Сохранено');
      } catch (error) {
        PHelp.Notification.Success('Что-то пошло не так');
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
