<template>
  <el-form>
    <div
      class="card"
      :style="{
        opacity: status == 'tomorrow' || status == 'preparing' ? '50%' : '100%',
      }"
    >
      <div class="image-box">
        <div class="favor"><FavouriteIcon :domain-id="123" :domain-name="favouriteDomain" /></div>
        <img
          v-if="dailyMenuItem.dishSample.image.fileSystemPath"
          data-test="doctor-photo"
          :src="dailyMenuItem.dishSample.image.getImageUrl()"
          alt="alt"
          @error="dailyMenuItem.dishSample.image.errorImg($event)"
        />
        <img v-else src="../../assets/svg/Buffet/food.webp" alt="alt" />
      </div>
      <div class="price">{{ dailyMenuItem.price }} р.</div>
      <div class="name">{{ dailyMenuItem.name }}</div>
      <div class="info">
        <div class="line1">Вес: {{ dailyMenuItem.weight }}гр.</div>
        <div class="line2">{{ dailyMenuItem.caloric }} ккал</div>
      </div>
      <Button :status="status" />
    </div>
  </el-form>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref } from 'vue';

import DailyMenuItem from '@/classes/DailyMenuItem';
import DailyMenuOrder from '@/classes/DailyMenuOrder';
import Button from '@/components/Diets/Button.vue';
import FavouriteIcon from '@/components/FavouriteIcon.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'DishCard',
  components: { Button, FavouriteIcon },
  props: {
    dailyMenuItem: {
      type: Object as PropType<DailyMenuItem>,
      required: true,
    },
  },
  setup(props) {
    const dailyMenuOrder: Ref<DailyMenuOrder> = computed(() => Provider.store.getters['dailyMenuOrders/item']);

    return {
      dailyMenuOrder,
      status,
    };
  },
});
</script>

<style scoped lang="scss">
.card {
  width: 170px;
  height: 355px;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  margin: 8px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 0 4px 0;
}

.image-box {
  display: block;
  width: 170px;
  height: 170px;
  overflow: hidden;
  margin-bottom: 5px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 170px;
    height: 170px;
    object-fit: cover;
  }
}
.name {
  display: flex;
  align-items: start;
  justify-content: left;
  height: 75px;
  font-size: 14px;
  text-align: left;
  padding: 0 16px;
  margin-top: 3px;
  color: #343e5c;
  line-height: 1.1;
}

.info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  width: calc(100% - 32px);
  height: 24px;
}

.line1 {
  font-size: 12px;
  color: #343e5c;
}
.line2 {
  font-size: 12px;
  color: #2754eb;
}

.price {
  padding-left: 16px;
  font-size: 22px;
  font-weight: bold;
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

.favor {
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: white;
  border-radius: 50%;
  border: 1px solid rgb(black, 0.1);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  width: 30px;
  height: 30px;
  &:hover {
    transform: scale(1.1);
  }
  .anticon {
    font-size: 20px;
    color: #bdc2d1;
  }
}

// :deep(.el-form) {
//   width: 120px;

// }
</style>
