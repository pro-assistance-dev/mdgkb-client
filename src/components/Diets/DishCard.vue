<template>
  <el-form>
    <div class="card">
      <div class="image-box">
        <img
          v-if="dailyMenuItem.dishSample.image.fileSystemPath"
          data-test="doctor-photo"
          :src="dailyMenuItem.dishSample.image.getImageUrl()"
          alt="alt"
          @error="dailyMenuItem.dishSample.image.errorImg($event)"
        />
        <img v-else src="../../assets/svg/Buffet/food.webp" alt="alt" />
      </div>
      <div class="name">{{ dailyMenuItem.name }}</div>
      <div class="info">
        <div class="left">
          <div class="line1">Вес: {{ dailyMenuItem.weight }}гр.</div>
          <div class="line2">{{ dailyMenuItem.caloric }} ккал</div>
        </div>
        <div class="right">{{ dailyMenuItem.price }} р.</div>
      </div>
      <div class="counter">
        <el-form-item label="">
          <el-input-number :min="0" :model-value="dailyMenuOrder.getItemQuantity(dailyMenuItem)" @change="(par, par1) => add(par, par1)" />
        </el-form-item>
      </div>
    </div>
  </el-form>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref } from 'vue';

import DailyMenuItem from '@/classes/DailyMenuItem';
import DailyMenuOrder from '@/classes/DailyMenuOrder';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'DishCard',
  props: {
    dailyMenuItem: {
      type: Object as PropType<DailyMenuItem>,
      required: true,
    },
  },
  setup(props) {
    const dailyMenuOrder: Ref<DailyMenuOrder> = computed(() => Provider.store.getters['dailyMenuOrders/item']);
    const add = (curNum: number, prevNum: number) => {
      if (curNum > prevNum) {
        dailyMenuOrder.value.increaseDailyMenuOrderItem(props.dailyMenuItem);
      } else {
        dailyMenuOrder.value.decreaseDailyMenuOrderItem(props.dailyMenuItem);
      }
    };
    return {
      add,
      dailyMenuOrder,
    };
  },
});
</script>

<style scoped lang="scss">
.card {
  width: 140px;
  height: 220px;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  margin: 8px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 0 4px 0;
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
  justify-content: center;
  width: calc(100% - 10px);
  height: 30px;
  font-size: 12px;
  text-align: center;
  padding: 0 5px;
  color: #343e5c;
}

.info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  width: calc(100% - 10px);
  height: 30px;
}

.line1 {
  font-size: 9px;
  color: #343e5c;
}
.line2 {
  font-size: 9px;
  color: #2754eb;
}

.right {
  font-size: 14px;
  color: #343e5c;
}

.counter {
  padding: 0 5px;
  width: calc(100% - 10px);
  height: 30px;
}

:deep(.el-input-number) {
  width: 100%;
  margin: 0;
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

// :deep(.el-form) {
//   width: 120px;

// }
</style>
