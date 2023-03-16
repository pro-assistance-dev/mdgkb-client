<template>
  <BufetPage v-if="$route.path === '/bufet'" />
  <BufetCart v-else-if="$route.path === '/bufet/cart'" />
  <BufetOrder v-else-if="$route.path === '/bufet/order'" />
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, ComputedRef, defineComponent, h, onBeforeUnmount, Ref, ref, watch } from 'vue';

import DailyMenuMenu from '@/classes/DailyMenu';
import DailyMenuMenuOrder from '@/classes/DailyMenuOrder';
import DishesGroup from '@/classes/DishesGroup';
import BufetCart from '@/components/Diets/BufetCart.vue';
import BufetOrder from '@/components/Diets/BufetOrder.vue';
import BufetPage from '@/components/Diets/BufetPage.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'BufetWrapper',
  components: { BufetPage, BufetCart, BufetOrder },
  setup() {
    const dailyMenu: Ref<DailyMenuMenu> = computed(() => Provider.store.getters['dailyMenus/item']);
    const dailyMenuOrder: Ref<DailyMenuMenuOrder> = computed(() => Provider.store.getters['dailyMenuOrders/item']);
    const isAuth: ComputedRef<boolean> = computed(() => Provider.store.getters['auth/isAuth']);
    const dishesGroupsSource: Ref<DishesGroup[]> = computed(() => Provider.store.getters['dishesGroups/items']);

    watch(isAuth, () => {
      Provider.store.commit('dailyMenuOrders/resetItem');
      Provider.router.push('/bufet');
    });

    const load = async () => {
      await Provider.store.dispatch('dailyMenus/todayMenu');
      dailyMenu.value.groupDishes(dishesGroupsSource.value);
      dailyMenuOrder.value.reproduceFromStore();
      checkDailyMenuItemsAvailable();
      // setInterval(async () => {
      //   await Provider.store.dispatch('dailyMenus/todayMenu');
      //   dailyMenu.value.groupDishes(dishesGroupsSource.value);
      //   console.log(dailyMenu.value);
      // }, 5000);
    };

    const checkDailyMenuItemsAvailable = () => {
      setInterval(() => {
        if (!dailyMenu.value.id) {
          return;
        }
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
        if (dailyMenuOrder.value.dailyMenuOrderItems.length === 0) {
          Provider.router.push('/bufet');
        }
      }, 2000);
    };

    Hooks.onBeforeMount(load);
  },
});
</script>
