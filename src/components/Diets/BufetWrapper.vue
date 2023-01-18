<template>
  <BufetPage v-if="$route.path === '/bufet'" />
  <BufetCart v-else-if="$route.path === '/bufet/cart'" />
  <BufetOrder v-else-if="$route.path === '/bufet/order'" />
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, defineComponent, h, Ref } from 'vue';

import BufetCart from '@/components/Diets/BufetCart.vue';
import BufetOrder from '@/components/Diets/BufetOrder.vue';
import BufetPage from '@/components/Diets/BufetPage.vue';
import IDailyMenu from '@/interfaces/IDailyMenu';
import IDailyMenuOrder from '@/interfaces/IDailyMenuOrder';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'BufetWrapper',
  components: { BufetPage, BufetCart, BufetOrder },

  setup() {
    const dailyMenu: Ref<IDailyMenu> = computed(() => Provider.store.getters['dailyMenus/item']);
    const dailyMenuOrder: Ref<IDailyMenuOrder> = computed(() => Provider.store.getters['dailyMenuOrders/item']);

    const load = async () => {
      await Provider.store.dispatch('dailyMenus/updateTodayMenu');
      dailyMenuOrder.value.reproduceFromStore();
      checkDailyMenuItemsAvailable();
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
      }, 1000);
    };

    Hooks.onBeforeMount(load);
  },
});
</script>
