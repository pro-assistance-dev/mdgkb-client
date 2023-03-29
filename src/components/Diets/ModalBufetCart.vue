<template>
  <CartContainer>
    <template #icon>
      <svg class="icon-close" @click="$emit('close')">
        <use xlink:href="#close"></use>
      </svg>
    </template>

    <template #title> Корзина </template>
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
        <button class="clear-cart" @click="clearOrder">
          <div>Очистить корзину</div>
          <svg class="icon-delete">
            <use xlink:href="#delete"></use>
          </svg>
        </button>
      </div>
    </template>

    <template #right>
      <div class="line-title">
        <div class="item">Блюда</div>
        <div class="price">{{ dailyMenuOrder.getPriceSum() }}₽.</div>
      </div>
      <div class="line-item">
        <div class="item">Доставка</div>
        <div class="price">{{ costOfDelivery }}₽.</div>
      </div>
      <br />
      <div class="line-item"></div>

      <div class="info">
        <el-form
          ref="userForm"
          v-model="dailyMenuOrder"
          class="phone"
          :model="dailyMenuOrder"
          label-width="150px"
          style="max-width: 320px"
          label-position="left"
        >
          <UserForm :form="dailyMenuOrder.formValue" :active-fields="UserFormFields.CreateWithPhone()" />
          <FieldValuesForm :form="dailyMenuOrder.formValue" />
        </el-form>
      </div>
      <div class="line-item">
        <div class="line-title">К оплате</div>
        <div class="total-price">{{ totalPrice }}₽.</div>
      </div>
      <button class="green" @click="createOrder">Заказать</button>
    </template>
  </CartContainer>
  <Close />
  <Delete />
</template>

<script lang="ts">
import { watch } from '@vue/runtime-core';
import { ElLoading, ElMessage, ElMessageBox, ElNotification } from 'element-plus';
import { computed, defineComponent, PropType, Ref, ref } from 'vue';

import Delete from '@/assets/svg/Buffet/Delete.svg';
import Close from '@/assets/svg/Filter/Close.svg';
import DailyMenuOrder from '@/classes/DailyMenuOrder';
import UserFormFields from '@/classes/UserFormFields';
import CartContainer from '@/components/Diets/CartContainer.vue';
import TableCard from '@/components/Diets/TableCard.vue';
import FieldValuesForm from '@/components/FormConstructor/FieldValuesForm.vue';
import UserForm from '@/components/FormConstructor/UserForm.vue';
import PhoneService from '@/services/PhoneService';
import Provider from '@/services/Provider/Provider';
import validate from '@/services/validate';

export default defineComponent({
  name: 'ModalBufetCart',
  components: { TableCard, Close, CartContainer, Delete, UserForm, FieldValuesForm },
  props: {
    isClose: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['close', 'orderCreated'],
  setup(props, { emit }) {
    const dailyMenuOrder: Ref<DailyMenuOrder> = computed(() => Provider.store.getters['dailyMenuOrders/item']);
    const userForm = ref();
    let costOfDelivery = Number(200);
    const totalPrice: Ref<number> = ref(dailyMenuOrder.value.getPriceSum() + costOfDelivery);

    const checkDailyMenuOrderIsEmpty = () => {
      if (dailyMenuOrder.value.isEmpty()) {
        emit('close');
      }
    };

    watch(dailyMenuOrder.value, checkDailyMenuOrderIsEmpty);

    const createOrder = async () => {
      const loading = ElLoading.service({
        lock: true,
        text: 'Загрузка',
      });
      dailyMenuOrder.value.formValue.validate();
      if (!validate(userForm, true) || !dailyMenuOrder.value.formValue.validated) {
        loading.close();
        return;
      }
      if (dailyMenuOrder.value.getPriceSum() < 150) {
        loading.close();
        return ElMessage.warning('Минимальная сумма заказа - 150 рублей');
      }
      dailyMenuOrder.value.formValue.clearIds();
      await Provider.store.dispatch('dailyMenuOrders/create', dailyMenuOrder.value);
      ElNotification({
        dangerouslyUseHTMLString: true,
        message: `<div />Заказ успешно создан. Для просмотра статуса перейдите в личный кабинет</div>`,
        type: 'success',
      });
      await Provider.store.commit('dailyMenuOrders/resetItem');
      emit('orderCreated');
      dailyMenuOrder.value.removeFromLocalStore();
      loading.close();
      emit('close');
    };

    const clearOrder = (): void => {
      ElMessageBox.confirm('Очистить корзину?', {
        distinguishCancelAndClose: true,
        confirmButtonText: 'Очистить',
        cancelButtonText: 'Отмена',
      })
        .then(() => {
          dailyMenuOrder.value.clear();
          emit('close');
        })
        .catch(() => {
          return;
        });
    };

    return {
      PhoneService,
      userForm,
      UserFormFields,
      clearOrder,
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
  // height: 120px;
  border-bottom: 1px solid #eff1f7;
  border-top: 1px solid #eff1f7;
}

.green {
  border: none;
  border-radius: 8px;
  background: #00bd5a;
  color: #ffffff;
  padding: 10px 0px;
  transition: 0.3s;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  font-size: 14px;
}

.green:hover {
  background: darken(#00bd5a, 10%);
}

.clear-cart {
  display: flex;
  align-items: center;
  justify-content: center;
  border: $normal-border;
  border-radius: 8px;
  background: #e3e4ef;
  color: #343e5c;
  transition: 0.3s;
  cursor: pointer;
  width: 200px;
  height: 32px;
  font-size: 14px;
}

.clear-cart:hover {
  background: darken(#e3e4ef, 10%);
}

.icon-delete {
  width: 16px;
  height: 16px;
  fill: #343e5c;
  cursor: pointer;
  transition: 0.3s;
  margin: 1px 0px 0 20px;
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

.phone {
  margin-top: 16px;
}

:deep(.el-form-item) {
  display: block;
}

:deep(.el-form--label-left .el-form-item__label) {
  margin-left: -11px;
  color: #343e5c;
}

:deep(.el-input__inner) {
  height: 36px;
  border-radius: 8px;
}

#elem {
  width: 100px;
  height: 100px;
  border: 1px solid black;
}

@media screen and (max-width: 768px) {
  .scroll {
    width: 100%;
    max-height: 50vh;
    overflow: hidden;
    overflow-y: auto;
  }
}

@media screen and (max-width: 400px) {
  .line-button {
    justify-content: center;
  }
}
</style>
