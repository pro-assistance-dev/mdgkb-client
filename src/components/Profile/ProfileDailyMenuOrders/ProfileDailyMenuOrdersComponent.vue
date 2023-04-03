<template>
  <CollapseContainer>
    <template #default="scope">
      <CollapseItem
        v-for="dailyMenuOrder in user.dailyMenuOrders"
        :key="dailyMenuOrder.id"
        :title="dailyMenuOrder.getFormattedNumber()"
        :tab-id="dailyMenuOrder.id"
        :collapsed="false"
        :active-id="scope.activeId"
        :show-tools-on-hover="false"
      >
        <template #tools>
          <div class="order-date">
            {{ $dateTimeFormatter.format(dailyMenuOrder.formValue.createdAt, { month: 'long', year: 'numeric' }) }}
          </div>
          <el-tag
            v-if="dailyMenuOrder.formValue.formStatus.label"
            size="small"
            :style="`background-color: inherit; color: ${dailyMenuOrder.formValue.formStatus.color}; border-color: ${dailyMenuOrder.formValue.formStatus.color}`"
            >{{ dailyMenuOrder.formValue.formStatus.label }}</el-tag
          >
        </template>
        <template #inside-content>
          <div class="margin-container">
            <CartContainer
              :width="'auto'"
              :background="'#F9FAFB'"
              :border="'1px solid #e9e9e9'"
              :icon-close="false"
              :left-background="'#ffffff'"
              :border-inside="true"
            >
              <template #title>
                <div class="position">
                  <div class="flex">
                    <Button
                      v-for="item in dailyMenuOrder.formValue.getUserActions()"
                      :key="item.id"
                      :text="item.childFormStatus.userActionName"
                      :color="item.childFormStatus.color"
                      :margin-right="'10px'"
                      width="120px"
                      height="36px"
                      font-size="14px"
                      @click="updateFormStatus(dailyMenuOrder.formValue, item.childFormStatus)"
                    />
                    <Button text="Чат(в разработке)" width="120px" height="36px" font-size="12px" />
                  </div>
                </div>
              </template>

              <template #left>
                <div class="scroll">
                  <div v-for="dailyMenuOrderItem in dailyMenuOrder.dailyMenuOrderItems" :key="dailyMenuOrderItem.id">
                    <div class="left">
                      <div class="image-box">
                        <img src="@/assets/svg/Buffet/food.webp" alt="alt" />
                      </div>
                      <div class="info">
                        <!-- <div class="small-title">Блюда из овощей</div> -->
                        <div class="name">{{ dailyMenuOrderItem.dailyMenuItem.name }}</div>
                        <div class="price-block">
                          <div class="quantity">10 шт</div>
                          <div class="price-pc">{{ dailyMenuOrderItem.getPriceSum() }}₽.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>

              <template #right>
                <div class="line-item">
                  <div class="item">Стоимость блюд</div>
                  <div class="price">{{ dailyMenuOrder.getPriceSum() }}₽.</div>
                </div>
                <div class="line-item">
                  <div class="item">Стоимость доставки</div>
                  <div class="price">{{ costOfDelivery }}₽.</div>
                </div>
                <br />
                <div class="line-item"></div>
                <div class="line-item">
                  <div class="line-title">К оплате</div>
                  <div class="total-price">{{ dailyMenuOrder.getPriceSum() }}₽.</div>
                </div>
              </template>
            </CartContainer>
          </div>
        </template>
      </CollapseItem>
    </template>
  </CollapseContainer>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import User from '@/classes/User';
import Button from '@/components/Base/Button.vue';
import CartContainer from '@/components/Diets/CartContainer.vue';
import CollapseContainer from '@/components/Main/Collapse/CollapseContainer.vue';
import CollapseItem from '@/components/Main/Collapse/CollapseItem.vue';
import IForm from '@/interfaces/IForm';
import IFormStatus from '@/interfaces/IFormStatus';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'ProfileDailyMenuOrders',
  components: {
    CollapseContainer,
    CollapseItem,
    Button,
    CartContainer,
  },
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },
  setup() {
    let costOfDelivery = Number(0);
    const formStatuses: ComputedRef<IFormStatus[]> = computed<IFormStatus[]>(() => Provider.store.getters['formStatuses/items']);
    const cancelDialogVisible: Ref<boolean> = ref(false);
    const selectedFormValue: Ref<IForm | undefined> = ref(undefined);
    const selectedStatus: Ref<IFormStatus | undefined> = ref(undefined);

    const cancelApplication = async (formValue: IForm, status: IFormStatus) => {
      ElMessageBox.confirm('Вы уверены, что хотите отменить заказ?', {
        confirmButtonText: 'Да',
        cancelButtonText: 'Отмена',
        type: 'warning',
      }).then(() => {
        formValue.setStatus(status, formStatuses.value);
        Provider.store.dispatch('formValues/update', formValue);
      });
    };

    const updateFormStatus = async (formValue: IForm, status: IFormStatus) => {
      if (status.isCancelled()) {
        await cancelApplication(formValue, status);
        return;
      }
      await Provider.store.dispatch('formValues/update', formValue);
    };

    onBeforeMount(async () => {
      await Provider.store.dispatch('formStatuses/getAll');
    });

    return {
      costOfDelivery,
      cancelDialogVisible,
      selectedFormValue,
      updateFormStatus,
    };
  },
});
</script>

<style lang="scss" scoped>
.line-title {
  width: 100%;
  margin-top: 16px;
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  letter-spacing: 1px;
  color: #343e5c;
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

.line-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.price-block {
  display: block;
}

.price-pc {
  font-size: 18px;
  width: 60px;
}

.name {
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 14px;
  color: #343e5c;
  margin-right: 10px;
}

.small-title {
  display: flex;
  align-items: center;
  justify-content: left;
  width: 100%;
  height: 20px;
  color: #a1a7bd;
  font-size: 11px;
  letter-spacing: 1px;
}

.quantity {
  display: flex;
  align-items: center;
  justify-content: right;
  width: 100%;
  height: 12px;
  color: #a1a7bd;
  font-size: 11px;
  letter-spacing: 1px;
  white-space: nowrap;
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}

.image-box {
  display: block;
  width: 50px;
  height: 50px;
  overflow: hidden;
  margin: 5px;
  position: relative;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
}

.left {
  display: flex;
  min-width: 50%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.order-date {
  font-weight: normal;
  margin-left: 5px;
}

.margin-container {
  padding: 10px;
}

.scroll {
  width: 100%;
  max-height: 50vh;
  overflow: hidden;
  overflow-y: auto;
}

.position {
  display: flex;
  align-items: center;
  justify-content: right;
  width: 100%;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: right;
  width: auto;
}

.total-price {
  font-size: 18px;
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 1px;
  font-weight: bold;
  margin-top: 16px;
}

.price-pc {
  display: flex;
  justify-content: right;
  align-items: center;
  font-size: 14px;
  width: auto;
  font-weight: bold;
}

@media screen and (max-width: 960px) {
  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-top: 0px;
  }

  .line-title {
    margin-top: 0px;
  }

  .total-price {
    margin-top: 0px;
  }

  .order-date {
    display: none;
  }
}

@media screen and (max-width: 540px) {
  .margin-container {
    padding: 10px 5px;
  }
  .flex {
    margin-top: 0px;
  }

  .price-pc {
    display: flex;
    justify-content: right;
    align-items: center;
    font-size: 14px;
    width: auto;
    font-weight: bold;
  }
}
</style>
