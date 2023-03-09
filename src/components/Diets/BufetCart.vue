<template>
  <div class="container-bufet">
    <div class="header">
      <div class="header-top">
        <div class="header-left">
          Номер палаты:
          <input id="room" type="text" name="name" placeholder="000" />
        </div>
        <div class="header-right">
          <button class="bufet" @click="$router.push('/bufet')">В меню</button>
        </div>
      </div>
      <div class="menu-bufet">
        <div class="menu-title">Ваш заказ:</div>
      </div>
    </div>
    <div class="table-main">
      <TableCard
        v-for="dailyMenuOrderItem in dailyMenuOrder.dailyMenuOrderItems"
        :key="dailyMenuOrderItem.id"
        :daily-menu-order-item="dailyMenuOrderItem"
      />
    </div>
    <div class="footer" @click="createOrder">
      <button class="add-to-card">Создать заказ</button>
      <div class="footer-info">
        <div class="field1">{{ dailyMenuOrder.getCaloricSum() }} ккал</div>
        <div class="field2">{{ dailyMenuOrder.getPriceSum() }} р.</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { watch } from '@vue/runtime-core';
import { ElMessage } from 'element-plus';
import { computed, defineComponent, Ref } from 'vue';

import TableCard from '@/components/Diets/TableCard.vue';
import IDailyMenuOrder from '@/interfaces/IDailyMenuOrder';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'BufetCart',
  components: { TableCard },
  setup() {
    const dailyMenuOrder: Ref<IDailyMenuOrder> = computed(() => Provider.store.getters['dailyMenuOrders/item']);

    const checkDailyMenuOrderItemsLength = () => {
      if (dailyMenuOrder.value.dailyMenuOrderItems.length === 0) {
        Provider.router.push('/bufet');
      }
    };

    watch(dailyMenuOrder.value.dailyMenuOrderItems, checkDailyMenuOrderItemsLength);

    const load = () => {
      checkDailyMenuOrderItemsLength();
    };

    Hooks.onBeforeMount(load);

    const createOrder = () => {
      if (!dailyMenuOrder.value.dailyMenuOrderItems.length) {
        ElMessage({
          message: 'Необходимо выбрать блюдо',
          type: 'warning',
        });
        return;
      }
      if (dailyMenuOrder.value.getPriceSum() < 150) {
        ElMessage({
          message: 'Минимальная сумма заказа - 150 рублей',
          type: 'warning',
        });
        return;
      }
      Provider.router.push('/bufet/order');
    };

    return {
      createOrder,
      dailyMenuOrder,
      mounted: Provider.mounted,
      schema: Provider.schema,
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';

.container-bufet {
  position: relative;
  width: 100%;
  color: #ffffff;
}

.header {
  display: block;
  position: sticky;
  top: 59px;
  width: 100%;
  z-index: 2;
}

.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 40px);
  height: 60px;
  background: #205bb8;
  padding: 0 20px;
}

.icon-cart {
  width: 40px;
  height: 40px;
  fill: #d2def1;
  cursor: pointer;
  transition: 0.3s;
}

.icon-cart:hover {
  fill: #ffffff;
}

.header-left {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 14px;
  color: inherit;
}

input[type='text'] {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  margin: 0 0 0 10px;
  border: none;
  border-radius: 20px;
  outline: none;
  background: #ffffff;
  text-transform: uppercase;
  padding-left: 12px;
  width: 33px;
  color: #205bb8;
}

.header-right {
  display: flex;
  align-items: center;
  justify-content: right;
  position: relative;
}

.sup {
  position: absolute;
  top: -3px;
  right: -8px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #449d7c;
  color: #ffffff;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

.menu-bufet {
  width: 100%;
  height: 34px;
  background: #379fff;
  display: flex;
  align-items: center;
  justify-content: left;
}

.item {
  height: 34px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  margin: 0 10px;
  color: #343e5c;
}
.active-item {
  display: flex;
  align-items: center;
  white-space: nowrap;
  margin: 0 10px;
  color: #ffffff;
}

.table-main {
  width: calc(100% - 32px);
  display: block;
  padding: 16px;
  height: 100vh;
}

.main > div {
  object-fit: cover;
}

.footer {
  width: calc(100% - 40px);
  padding: 0 20px;
  height: 40px;
  background: #449d7c;
  display: flex;
  align-content: center;
  justify-content: space-between;
  cursor: pointer;
  position: sticky;
  bottom: 0px;
  z-index: 2;
}

.footer:hover {
  background: lighten(#449d7c, 10%);
}

.footer-info {
  display: flex;
  align-items: center;
  justify-content: right;
}

.add-to-card {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  margin: 0;
  border: none;
  padding: 0px;
  background: inherit;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
}

.field1 {
  font-size: 10px;
  color: #2754eb;
  margin-right: 20px;
}

.field2 {
  font-size: 16px;
  color: #ffffff;
}

.menu-title {
  font-size: 18px;
  color: #ffffff;
  margin-left: 20px;
}

.bufet {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin: 0;
  cursor: pointer;
  color: #d2def1;
  border: none;
  padding: 0px;
  background: inherit;
}

.bufet:hover {
  color: #ffffff;
}

@media screen and (max-width: 768px) {
  .menu-bufet {
    width: 100%;
    height: 34px;
    background: #379fff;
    display: flex;
    align-items: center;
    justify-content: left;
  }

  .container-bufet {
    margin-top: -20px;
  }
}
</style>
