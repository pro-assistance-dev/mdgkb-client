<template>
  <BufetPage v-if="$route.path === '/bufet'" />
  <BufetCart v-else-if="$route.path === '/bufet/cart'" />
  <BufetOrder v-else-if="$route.path === '/bufet/order'" />
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, defineComponent, h, onBeforeUnmount, Ref, ref } from 'vue';

import FilterModel from '@/classes/filters/FilterModel';
import BufetCart from '@/components/Diets/BufetCart.vue';
import BufetOrder from '@/components/Diets/BufetOrder.vue';
import BufetPage from '@/components/Diets/BufetPage.vue';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import IDailyMenu from '@/interfaces/IDailyMenu';
import IDailyMenuOrder from '@/interfaces/IDailyMenuOrder';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import DailyMenusFiltersLib from '@/services/Provider/libs/filters/DailyMenusFiltersLib';

export default defineComponent({
  name: 'BufetWrapper',
  components: { BufetPage, BufetCart, BufetOrder },

  setup() {
    const dailyMenus: Ref<IDailyMenu[]> = computed(() => Provider.store.getters['dailyMenus/items']);
    const dailyMenu: Ref<IDailyMenu> = computed(() => Provider.store.getters['dailyMenus/item']);
    const dailyMenuOrder: Ref<IDailyMenuOrder> = computed(() => Provider.store.getters['dailyMenuOrders/item']);
    const dayFilter: Ref<IFilterModel> = ref(new FilterModel());
    let sourceSSE: EventSource | undefined = undefined;

    const load = async () => {
      sourceSSE = await Provider.handlerSSE<IDailyMenu>('daily-menu-update', '', updateMenu);
      dayFilter.value = DailyMenusFiltersLib.byDate(new Date());
      await getDailyMenus();
      await Provider.store.dispatch('dailyMenus/updateTodayMenu');
    };

    const updateMenu = async (e: MessageEvent) => {
      await getDailyMenus();
      checkDailyMenuItemsAvailable();
    };

    const getDailyMenus = async () => {
      const userTimezoneOffset = new Date().getTimezoneOffset() * 60000;
      dayFilter.value.date1 = new Date(new Date().getTime() - userTimezoneOffset);
      Provider.setFilterModel(dayFilter.value);
      // await Provider.store.dispatch('dailyMenus/getAll', Provider.filterQuery.value);
      if (dailyMenus.value.length === 0) {
        return;
      }
      const activeMenu = dailyMenus.value.find((d: IDailyMenu) => d.active);
      Provider.store.commit('dailyMenus/set', activeMenu);
      dailyMenu.value.groupDishes();
    };

    const checkDailyMenuItemsAvailable = () => {
      const nonAvailableItems = dailyMenuOrder.value.filterAndGetNonActualDailyMenuItems(dailyMenu.value);
      if (nonAvailableItems.length === 0) {
        return;
      }
      ElMessageBox({
        title: 'Некоторые блюда стали недоступны и удалены из корзины',
        message: h(
          'p',
          null,
          nonAvailableItems.map(({ id, dailyMenuItem: dailyMenuItem }) => {
            return h('div', { key: id }, `${dailyMenuItem.name}`);
          })
        ),
      });
    };

    Hooks.onBeforeMount(load);

    onBeforeUnmount(async () => {
      sourceSSE?.close();
      // await Provider.store.dispatch('comments/unsubscribeCreate');
    });
  },
});
</script>
