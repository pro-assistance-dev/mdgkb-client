<template>
  <DishInfo :left-width="'360px'" :background="'#ffffff'" :is-single="true" >
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
    <template #small-title>
      Завтрак&nbsp;-&nbsp;Блюда из овощей
    </template>
    <template #title>
      <div class="name">
        {{ dailyMenuItem.name }}
      </div>
      <div class="weight">
        {{ dailyMenuItem.weight }} г
      </div>
    </template>
    <template #info>
      <div class="text">
        Диетический салат из смеси овошей, с добавлением оливкового масла и петрушки
      </div>
      <div class="info-title">
        Состав
      </div>
      <div class="text">
        Капуста белокачанная, морковь, перец болгарский, соль, лимон (сок), масло растительное (оливковое), петрушка свежая
      </div>
      <div class="info-title">
        Пищевая ценность на 100 г
      </div>
      <table class="table-list">
        <colgroup>
          <col width="60px" />
          <col width="60px" />
          <col width="60px" />
          <col width="100px" />
        </colgroup>
        <thead>
          <tr>
            <td style="font-size: 11px; color: #a1a7bd;" >Белки</td>
            <td style="font-size: 11px; color: #a1a7bd;">Жиры</td>
            <td style="font-size: 11px; color: #a1a7bd;">Углеводы</td>
            <td style="font-size: 11px; color: #a1a7bd;">Энерг.&nbsp;ценность</td>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td style="font-size: 12px; color: #343e5c;">
                4 г
              </td>
              <td style="font-size: 12px; color: #343e5c;">
                2 г
              </td>
              <td style="font-size: 12px; color: #343e5c;">
                52 г
              </td>
              <td style="font-size: 12px; color: #343e5c;">
                {{ dailyMenuItem.caloric }} калл
              </td>
            </tr>
        </tbody>
      </table>
      <div class="footer">
        <div class="price">{{ dailyMenuItem.price }}₽</div>
        <DishCardButton :daily-menu-item="dailyMenuItem" :status="status" />
      </div>
    </template>

  </DishInfo>
  <Close />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref } from 'vue';

import Close from '@/assets/svg/Filter/Close.svg';
import DailyMenuOrder from '@/classes/DailyMenuOrder';
import DishContainer from '@/components/Diets/DishContainer.vue';
import Provider from '@/services/Provider/Provider';
import DishInfo from '@/components/Diets/DishInfo.vue';
import DishCardButton from '@/components/Diets/DishCardButton.vue';
import DailyMenuItem from '@/classes/DailyMenuItem';

export default defineComponent({
  name: 'ModalDishCard',
  components: { Close, DishContainer, DishInfo, DishCardButton },
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

.body {
  position: relative;
  width: 938px;
  min-height: 10px;
  border: $normal-border;
  border-radius: $normal-border-radius;
  background: #ffffff;
  padding: 16px;
  word-wrap: none;
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

.item {
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 1px;
  font-weight: normal;
  margin-top: 10px;
}

.info {
  height: 120px;
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

@media screen and (max-width: 768px) {
}
</style>
