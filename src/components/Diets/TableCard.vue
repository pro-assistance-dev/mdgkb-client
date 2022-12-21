<template>
  <div class="table-card">
    <div class="left">
      <div class="info">
        <div class="name">{{ dailyMenuOrderItem.dailyMenuItem.name }}</div>
        <div class="bottom">
          <div class="item1">Вес: {{ dailyMenuOrderItem.getWeightSum() }}гр.</div>
          <div class="item2">Калории: {{ dailyMenuOrderItem.getCaloricSum() }}</div>
        </div>
      </div>
      <div class="counter">
        <el-form>
          <el-form-item label="">
            <el-input-number :min="1" :model-value="dailyMenuOrderItem.quantity" placeholder="1" @change="add"></el-input-number>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-button @click="removeItem">Удалить</el-button>
    <div class="right">{{ dailyMenuOrderItem.getPriceSum() }} р.</div>
  </div>
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, defineComponent, PropType, Ref } from 'vue';

import IDailyMenuOrder from '@/interfaces/IDailyMenuOrder';
import IDailyMenuOrderItem from '@/interfaces/IDailyMenuOrderItem';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'BufetCard',
  props: {
    dailyMenuOrderItem: {
      type: Object as PropType<IDailyMenuOrderItem>,
      required: true,
    },
  },
  setup(props) {
    const dailyMenuOrder: Ref<IDailyMenuOrder> = computed(() => Provider.store.getters['dailyMenuOrders/item']);
    const add = (curNum: number, prevNum: number) => {
      changeDailyMenuOrderItemQuantity(curNum, prevNum);
    };

    const changeDailyMenuOrderItemQuantity = (curNum: number, prevNum: number) => {
      if (curNum > prevNum) {
        dailyMenuOrder.value.increaseDailyMenuOrderItem(props.dailyMenuOrderItem.dailyMenuItem);
      } else {
        dailyMenuOrder.value.decreaseDailyMenuOrderItem(props.dailyMenuOrderItem.dailyMenuItem);
      }
    };

    const removeItem = () => {
      ElMessageBox.confirm('Убрить блюдо из корзины?', {
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

    return {
      removeItem,
      add,
      dailyMenuOrder,
    };
  },
});
</script>

<style scoped lang="scss">
.table-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% - 10px);
  min-height: 45px;
  border: 1px solid #c4c4c4;
  padding: 5px;
  margin-bottom: -1px;
}

.image-box {
  display: block;
  width: 140px;
  height: 120px;
  overflow: hidden;
  margin-bottom: 5px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 140px;
    height: 120px;
    object-fit: cover;
  }
}
.name {
  display: flex;
  align-items: center;
  justify-content: left;
  min-width: 50px;
  font-size: 12px;
  color: #343e5c;
}

.left {
  display: flex;
  align-items: center;
  justify-content: left;
}

.info {
  display: block;
  margin-right: 10px;
}

.bottom {
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 0;
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
  width: 102px;
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
  line-height: 26px;
}

:deep(.el-input__inner) {
  border-radius: 40px;
  padding-left: 25px;
  height: 26px;
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
  height: 24px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

:deep(.el-input-number__decrease) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}
</style>
