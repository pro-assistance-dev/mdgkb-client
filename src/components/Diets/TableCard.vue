<template>
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
        <img src="../../assets/svg/Buffet/food.webp" alt="eat" />
      </div>
      <div class="info">
        <div class="small-title">Завтрак - Блюда из овощей</div>
        <div class="name">{{ dailyMenuOrderItem.dailyMenuItem.name }}</div>
        <div class="price-pc">{{ dailyMenuOrderItem.getPriceSum() }}₽.</div>
      </div>
    </div>
    <div class="right">
      <div class="price-mobile">{{ dailyMenuOrderItem.getPriceSum() }}₽.</div>
      <div class="right-item">
        <div class="counter">
          <el-form>
            <el-form-item label="">
              <el-input-number
                :model-value="dailyMenuOrderItem.quantity"
                placeholder="1"
                @change="(oldNum, newNum) => changeDailyMenuOrderItemQuantity(oldNum, newNum)"
              ></el-input-number>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <Delete />
  </div>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, defineComponent, PropType, Ref } from 'vue';

import Delete from '@/assets/svg/Buffet/Delete.svg';
import DailyMenuOrder from '@/classes/DailyMenuOrder';
import DailyMenuOrderItem from '@/classes/DailyMenuOrderItem';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'BufetCard',
  components: {
    Delete,
  },
  props: {
    dailyMenuOrderItem: {
      type: Object as PropType<DailyMenuOrderItem>,
      required: true,
    },
  },
  setup(props) {
    const dailyMenuOrder: Ref<DailyMenuOrder> = computed(() => Provider.store.getters['dailyMenuOrders/item']);

    const removeItem = () => {
      ElMessageBox.confirm('Убрать блюдо из корзины?', {
        distinguishCancelAndClose: true,
        confirmButtonText: 'Убрать',
        cancelButtonText: 'Отмена',
      })
        .then(() => {
          dailyMenuOrder.value.removeDailyMenuOrderItem(props.dailyMenuOrderItem);
        })
        .catch(() => {
          return;
        });
    };

    const changeDailyMenuOrderItemQuantity = (newNum: number, oldNum: number): void => {
      if (newNum === 0) {
        return removeItem();
      }
      dailyMenuOrder.value.changeDailyMenuOrderItemQuantity(newNum, oldNum, props.dailyMenuOrderItem.dailyMenuItem);
    };

    return {
      changeDailyMenuOrderItemQuantity,
      removeItem,
      dailyMenuOrder,
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/base-style.scss';

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
    border-bottom: $normal-border;
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
</style>
