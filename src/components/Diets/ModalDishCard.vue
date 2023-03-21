<template>
  <DishInfo>
    <template #icon>
      <svg class="icon-close" @click="$emit('close')">
        <use xlink:href="#close"></use>
      </svg>
    </template>
    <template #image>
      <div class="image-box">
        <img src="../../assets/svg/Buffet/food.webp" alt="alt" />
      </div>
    </template>
    <template #small-title> Завтрак&nbsp;-&nbsp;Блюда из овощей </template>
    <template #title>
      <div class="name">
        {{ dailyMenuItem.name }}
      </div>
      <div class="weight">{{ dailyMenuItem.weight }}&nbsp;г</div>
    </template>
    <template #info>
      <div class="text">Диетический салат из смеси овошей, с добавлением оливкового масла и петрушки</div>
      <div class="info-title">Состав</div>
      <div class="text">
        Капуста белокачанная, морковь, перец болгарский, соль, лимон (сок), масло растительное (оливковое), петрушка свежая
      </div>
      <div class="info-title">Пищевая ценность на 100 г</div>

      <DishInfoTable :daily-menu-item="dailyMenuItem" />
      <div class="footer">
        <div class="price">{{ dailyMenuItem.price }}₽</div>
        <DishCardButton :daily-menu-item="dailyMenuItem" :status="status" />
      </div>
    </template>
  </DishInfo>
  <Close />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Close from '@/assets/svg/Filter/Close.svg';
import DailyMenuItem from '@/classes/DailyMenuItem';
import DishCardButton from '@/components/Diets/DishCardButton.vue';
import DishInfo from '@/components/Diets/DishInfo.vue';
import DishInfoTable from '@/components/Diets/DishInfoTable.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'ModalDishCard',
  components: { Close, DishInfo, DishCardButton, DishInfoTable },
  props: {
    isClose: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    dailyMenuItem: {
      type: Object as PropType<DailyMenuItem>,
      required: true,
    },
  },
  emits: ['close'],
  setup() {
    return {
      mounted: Provider.mounted,
      schema: Provider.schema,
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';

.image-box {
  display: block;
  width: 360px;
  height: 360px;
  overflow: hidden;
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
    width: 360px;
    height: 360px;
    object-fit: cover;
  }
}

.name {
  display: flex;
  align-items: end;
  font-size: 24px;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  letter-spacing: 1px;
  color: #343e5c;
  padding: 0;
  max-width: 300px;
  font-weight: bold;
  line-height: 1.2;
}

.weight {
  margin-left: 10px;
  display: flex;
  font-family: 'Open Sans', sans-serif;
  align-items: end;
  justify-content: left;
  max-width: 100px;
  color: #a1a7bd;
  font-size: 16px;
  letter-spacing: 1px;
}

.text {
  font-family: 'Open Sans', sans-serif;
  color: #343e5c;
  font-size: 14px;
  letter-spacing: 1px;
  margin-top: 5px;
  line-height: 1.2;
  max-width: 460px;
}

.info-title {
  font-family: 'Open Sans', sans-serif;
  color: #343e5c;
  font-size: 16px;
  letter-spacing: 1px;
  margin-top: 16px;
  font-weight: bold;
  line-height: 1.2;
}

.footer {
  max-width: 280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}

.price {
  padding-left: 16px;
  font-size: 24px;
  font-weight: bold;
  color: #343e5c;
  letter-spacing: 1px;
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

:deep(.el-form-item) {
  display: block;
  margin-bottom: 22px;
}

:deep(.el-form--label-left .el-form-item__label) {
  margin-left: -11px;
  color: #343e5c;
}

:deep(.el-input__inner) {
  height: 36px;
  border-radius: 8px;
}

@media screen and (max-width: 400px) {
  .image-box {
    display: block;
    width: 300px;
    height: 300px;
    overflow: hidden;
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
      width: 300px;
      height: 300px;
      object-fit: cover;
    }
  }
}
</style>
