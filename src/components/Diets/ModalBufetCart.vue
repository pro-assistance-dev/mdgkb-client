<template>
  <CartContainer @isClose="openModalCart" >
    <template #icon>
      <svg class="icon-close" @click="$emit('isClose')">
        <use xlink:href="#close"></use>
      </svg>
    </template>  

    <template #title>
      Корзина
    </template>
    <template #left>
      <div class="line-title">Ваш заказ</div>
      <div class="scroll">
        <TableCard
          v-for="dailyMenuOrderItem in dailyMenuOrder.dailyMenuOrderItems"
          :key="dailyMenuOrderItem.id"
          :daily-menu-order-item="dailyMenuOrderItem"
        />
      </div>
      <div class="line-button">
        <button class="clear-cart" >
          <div>Очистить корзину</div>
          <svg class="icon-delete" @click="removeItem">
            <use xlink:href="#delete"></use>
          </svg>
        </button>
      </div>
    </template>

    <template #right>
      <div class="line-title">Итого</div>
      <div class="line-item">
        <div class="item">Блюда</div>
        <div class="price">{{ price }}₽.</div>
      </div>
      <div class="line-item">
        <div class="item">Доставка</div>
        <div class="price">{{ costOfDelivery }}₽.</div>
      </div>
      <div class="info"></div>
      <div class="line-item">
        <div class="line-title">К оплате</div>
        <div class="total-price">{{ totalPrice }}₽.</div>
      </div>
      <button class="green" @click="createOrder">Перейти к оплате</button>
    </template>
  </CartContainer>
  <Close />
  <Delete />
</template>

<script lang="ts">
import { watch } from '@vue/runtime-core';
import { ElMessage } from 'element-plus';
import { computed, defineComponent, Ref, PropType } from 'vue';

import DailyMenuOrder from '@/classes/DailyMenuOrder';
import TableCard from '@/components/Diets/TableCard.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import CartContainer from '@/components/Diets/CartContainer.vue';
import Delete from '@/assets/svg/Buffet/Delete.svg';

import Close from '@/assets/svg/Filter/Close.svg';

export default defineComponent({
  name: 'ModalBufetCart',
  emits: ['isClose'],
  components: { TableCard, Close, CartContainer, Delete },
  props: {
    isClose: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    price: {
      type: Number as PropType<number>,
      default: 0,
    },
  },
  setup(props) {
    const dailyMenuOrder: Ref<DailyMenuOrder> = computed(() => Provider.store.getters['dailyMenuOrders/item']);
    let costOfDelivery = Number(200);
    let totalPrice = props.price + costOfDelivery;
    const checkDailyMenuOrderItemsLength = () => {
      console.log('check', dailyMenuOrder.value.dailyMenuOrderItems);
      if (dailyMenuOrder.value.dailyMenuOrderItems.length === 0) {
        Provider.router.push('/bufet');
      }
    };

    watch(dailyMenuOrder.value, checkDailyMenuOrderItemsLength);

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
      costOfDelivery,
      totalPrice,
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';


.body {
  position: relative;
  width: 938px;
  min-height: 10px;
  border: $normal-border;
  border-radius: $normal-border-radius;
  background: #ffffff;
  padding: 16px;
}

.icon-close {
  width: 16px;
  height: 16px;
  fill: #343e5c;
  cursor: pointer;
  transition: 0.3s;
}

.icon-close:hover {
  fill: #205bb8;
}

.title {
  height: 24px;
  width: calc(100% - 40px);
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 24px;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  letter-spacing: 1px;
  color: #343e5c;
  padding: 0;
  margin: 0;
}

.line {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  letter-spacing: 1px;
  color: #343e5c;
}
.line-title {
  width: 100%;
  margin-top: 16px;
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  letter-spacing: 1px;
  color: #343e5c;
}

.line-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.item {
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 1px;  
  font-weight: normal;
  margin-top: 10px;
}

.price {
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 1px;  
  font-weight: bold;
  margin-top: 10px;
}

.total-price {
  font-size: 18px;
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 1px;  
  font-weight: bold;
  margin-top: 16px;
}

.info {
  height: 120px;
  border-bottom: 1px solid #EFF1F7;
}

.green {
  border: none;
  border-radius: 8px;
  background: #00BD5A;
  color: #ffffff;
  padding: 10px 0px;
  transition: 0.3s;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  font-size: 14px;
}

.green:hover {
  background: darken(#00BD5A, 10%);
}

.clear-cart {
  display: flex;
  align-items: center;
  justify-content: center;
  border: $normal-border;
  border-radius: 8px;
  background: #E3E4EF;
  color: #343e5c;
  transition: 0.3s;
  cursor: pointer;
  width: 200px;
  height: 32px;
  font-size: 14px;
}

.clear-cart:hover {
  background: darken(#E3E4EF, 10%);
}

.icon-delete {
  width: 16px;
  height: 16px;
  fill: #343e5c;
  cursor: pointer;
  transition: 0.3s;
  margin: 1px 0px 0 20px;
}

.icon-delete:hover {
  fill: #379fff;
}

.line-button {
  display: flex;
  justify-content: right;
  margin-top: 16px;
}

.scroll {
  width: 100%;
  max-height: 50vh;
  overflow: hidden;
  overflow-y: auto;
}

@media screen and (max-width: 768px) {

}
</style>
