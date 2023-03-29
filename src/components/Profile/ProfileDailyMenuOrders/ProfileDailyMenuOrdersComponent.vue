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
          <div class="flex">
            <div class="scroll">
              <div v-for="dailyMenuOrderItem in dailyMenuOrder.dailyMenuOrderItems" :key="dailyMenuOrderItem.id">
                <div class="table-card">
                  <div class="left">
                    <div class="image-box">
                      <!-- <img
                          v-if="dailyMenuOrderItem.dishSample.image.fileSystemPath"
                          data-test="doctor-photo"
                          :src="dailyMenuOrderItem.dishSample.image.getImageUrl()"
                          alt="alt"
                          @error="dailyMenuOrderItem.dishSample.image.errorImg($event)"
                        /> -->
                      <img src="@/assets/svg/Buffet/food.webp" alt="alt" />
                    </div>
                    <div class="info">
                      <div class="small-title">Блюда из овощей</div>
                      <div class="name">{{ dailyMenuOrderItem.dailyMenuItem.name }}</div>
                      <div class="price-pc">{{ dailyMenuOrderItem.getPriceSum() }}₽.</div>
                    </div>
                  </div>
                  <div class="right">
                    <div class="price-mobile">{{ dailyMenuOrderItem.getPriceSum() }}₽.</div>
                  </div>
                  <Delete />
                </div>
              </div>
            </div>
            <div>
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
                <div class="price">{{ dailyMenuOrder.getPriceSum() }}₽.</div>
              </div>
            </div>
            <div>
              <Button
                v-for="item in dailyMenuOrder.formValue.getUserActions()"
                :key="item.id"
                :text="item.childFormStatus.userActionName"
                :color="item.childFormStatus.color"
                :margin-top="'5px'"
                width="80px"
                @click="updateFormStatus(dailyMenuOrder.formValue, item.childFormStatus)"
              />
              <Button text="Чат (в разработке)" :margin-top="'5px'" width="200px" />
            </div>
          </div>
          <div></div>
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
import TableCard from '@/components/Diets/TableCard.vue';
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
        // selecteddailyMenuOrder.formValue.value = formValue;
        // selectedStatus.value = status;
        // cancelDialogVisible.value = !cancelDialogVisible.value;
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
.order-date {
  font-weight: normal;
  margin-left: 5px;
}

@media screen and (max-width: 980px) {
  .order-date {
    display: none;
  }
}

h4 {
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 0.1ex;
  margin: 0px;
  font-size: 11px;
  font-weight: normal;
  color: #a3a5b9;
}

table {
  height: auto;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border-bottom: 1px solid #dcdfe6;
  padding: 9px 7px 9px 7px;
  height: auto;
}

.status-button {
  img {
    height: 25px;
  }
  margin-bottom: 2px;
  padding: 3px 7px;
  border-radius: 5px;
  font-size: 20px;
  &:hover {
    cursor: pointer;
    filter: brightness(110%);
  }
}

.box {
  position: relative;
  margin-right: 20px;
}

@media screen and (max-width: 980px) {
  .box {
    margin-right: 0px;
    background: #ffffff;
  }
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
.red {
  color: red;
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

// TODO: ВЫЧИСТИТЬ СТИЛИ
.hidden {
  visibility: hidden;
  position: absolute;
  z-index: -1;
}

.table-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 10px);
  min-height: 45px;
  padding: 5px;
  margin-bottom: -1px;
}

.image-box {
  display: block;
  width: 96px;
  height: 96px;
  overflow: hidden;
  margin-bottom: 5px;
  margin-right: 16px;
  position: relative;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 96px;
    height: 96px;
    object-fit: cover;
  }
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

.left {
  display: flex;
  min-width: 50%;
  justify-content: space-between;
}

.info {
  margin-top: 10px;
  display: block;
  margin-right: 10px;
  width: 100%;
  height: 100%;
}

.bottom {
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 0 0 0 5px;
  width: calc(100% - 10px);
}

.item1 {
  font-size: 9px;
  color: #343e5c;
}

.item2 {
  font-size: 9px;
  color: #2754eb;
  margin-left: 5px;
}

.right {
  display: flex;
  align-items: center;
  justify-content: right;
  font-size: 14px;
  color: #343e5c;
  white-space: nowrap;
  min-width: 50px;
}

.counter {
  display: flex;
  align-items: center;
  padding: 0 5px;
  width: 140px;
}

:deep(.el-form-item) {
  margin-bottom: 0px;
}

:deep(.el-input-number) {
  width: 100%;
  margin: 0;
}

:deep(.el-input-number .el-input__inner) {
  padding-left: 10px;
  padding-right: 10px;
}

:deep(.el-form-item__content) {
  line-height: 32px;
}

:deep(.el-input__inner) {
  border-radius: 8px;
  padding-left: 25px;
  height: 32px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
  color: #4a4a4a;
  padding: 0 10px;
}

:deep(.el-input-number__increase) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 30px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  background: #ffffff;
  border: none;
}

:deep(.el-input-number__decrease) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 30px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background: #ffffff;
  border: none;
}

.icon-delete-table {
  width: 16px;
  height: 16px;
  fill: #343e5c;
  cursor: pointer;
  transition: 0.3s;
  margin: 1px 20px 0 20px;
  margin-right: 20px;
}

.icon-delete-table:hover {
  fill: #379fff;
}

.right-item {
  display: flex;
  align-items: center;
  justify-content: right;
  width: 170px;
}

.price-pc {
  font-size: 18px;
  width: 60px;
}

.price-mobile {
  font-size: 18px;
  width: 60px;
  display: none;
}

@media screen and (max-width: 540px) {
  .table-card {
    display: block;
    padding: 10px 0;
    width: 100%;
  }

  .left {
    width: 100%;
    padding-bottom: 0px;
  }

  .info {
    width: 100%;
    margin-right: 0px;
    margin-top: 0px;
  }

  .right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: auto;
    padding-bottom: 10px;
  }

  .right-item {
    display: flex;
    align-items: center;
    justify-content: left;
    width: auto;
    height: auto;
  }

  .counter {
    height: auto;
  }

  .name {
    font-size: 13px;
    line-height: 1.1;
    margin-top: 5px;
    margin-right: 0px;
  }
  .small-title {
    line-height: 1.1;
  }

  .price-pc {
    display: none;
  }

  .price-mobile {
    display: block;
  }

  .image-box {
    display: block;
    width: 60px;
    height: 60px;
    overflow: hidden;
    margin-bottom: 0px;
    margin-right: 5px;
    position: relative;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
      object-fit: cover;
    }
  }
}

.flex {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
