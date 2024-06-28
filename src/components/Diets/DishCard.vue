<template>
  <div v-if="modalDishIsOpen" class="menu-shadow">
    <ModalDishCard
      :daily-menu-item="dailyMenuItem"
      :dishes-group-name="dishesGroupName"
      :daily-menu-name="dailyMenuName"
      @close="toggleModalDishCard"
    />
  </div>
  <el-form>
    <div
      :id="dailyMenuItem.id"
      class="card"
      :style="{
        opacity: status == 'tomorrow' || status == 'preparing' ? '50%' : '100%',
      }"
    >
      <div class="click-container" @click="toggleModalDishCard()">
        <div class="image-box">
          <div class="favor">
            <FavouriteIcon :domain-id="123" :domain-name="'favouriteDomain'" />
          </div>
          <img
            v-if="dailyMenuItem.dishSample.image.fileSystemPath"
            data-test="eat-photo"
            :src="dailyMenuItem.dishSample.image.getImageUrl()"
            alt="doctor-photo"
            @error="dailyMenuItem.dishSample.image.errorImg($event)"
          />
          <img v-else :src="FoodImg" alt="eat-photo" />
        </div>
        <div class="price">{{ dailyMenuItem.price }} р.</div>
        <div class="name">{{ dailyMenuItem.name }}</div>
        <div class="info">
          <div class="line1">Вес:{{ dailyMenuItem.weight }}гр.</div>
          <div class="line2">
            <div class="hidden-parent">
              {{ dailyMenuItem.caloric }}&nbsp;ккал
              <div class="hidden-comment">
                <DishInfoTable :daily-menu-item="dailyMenuItem" :for-card="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DishCardButton :daily-menu-item="dailyMenuItem" :status="status" />
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import FoodImg from '@/assets/svg/Buffet/food.webp';
import DailyMenuItem from '@/classes/DailyMenuItem';
import DailyMenuOrder from '@/classes/DailyMenuOrder';
import DishCardButton from '@/components/Diets/DishCardButton.vue';
import DishInfoTable from '@/components/Diets/DishInfoTable.vue';
import ModalDishCard from '@/components/Diets/ModalDishCard.vue';
import FavouriteIcon from '@/components/FavouriteIcon.vue';
import Provider from '@/services/Provider/Provider';

const props = defineProps({
  dailyMenuItem: {
    type: Object as PropType<DailyMenuItem>,
    required: true,
  },
  dishesGroupName: {
    type: String as PropType<string>,
    required: true,
  },
  dailyMenuName: {
    type: String as PropType<string>,
    required: true,
  },
});
const dailyMenuOrder: Ref<DailyMenuOrder> = computed(() => Provider.store.getters['dailyMenuOrders/item']);
let status = 'inStock';
const modalDishIsOpen: Ref<boolean> = ref(false);

const toggleModalDishCard = () => {
  modalDishIsOpen.value = !modalDishIsOpen.value;
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

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

.menu-shadow {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.click-container {
  cursor: pointer;
  -webkit-user-select: none;
  /* Safari */
  -ms-user-select: none;
  /* IE 10 and IE 11 */
  user-select: none;
  /* Standard syntax */
}

.hidden-parent {
  position: relative;
}

.hidden-comment {
  min-width: 150px;
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  font-weight: $title-font-weight;
  padding: 0 7px;
  border-radius: $border-radius;
  border: $normal-border;
  color: #ffffff;
  background: $site_dark_gray;
  display: none;
  opacity: 0.8;
  z-index: 1;
}

.hidden-comment:after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -30px;
  margin-left: -16px;
  border: 16px solid transparent;
  border-top: 20px solid $site_dark_gray;
}

.hidden-parent:hover {
  cursor: pointer;
  color: darken($color: #2754eb, $amount: 20%);
}

.hidden-parent:hover > .hidden-comment {
  display: block;
}
</style>
