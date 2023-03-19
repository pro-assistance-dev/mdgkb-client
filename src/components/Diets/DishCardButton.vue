<template>
  <div
    class="button"
    :style="{
      marginTop: marginTop,
      marginRight: marginRight,
      color: status == 'inStock' || status == 'inCart' ? '#ffffff' : '#a1a7bd',
      height: height,
      borderRadius: '10px',
      width: width,
      background: status == 'inCart' || status == 'inStock' ? '#31AF5E' : '#ffffff',
    }"
    @click="handClick"
    @mouseenter="hovering = true" 
    @mouseleave="hovering = false"
  >
    <div
      v-if="dailyMenuOrder.getItemQuantity(dailyMenuItem) === 0"
      class="inblock"
      @click="dailyMenuOrder.increaseDailyMenuOrderItem(dailyMenuItem)"
    >
      <svg class="icon-plus"
          :style="{
            opacity: hovering && status == 'inCart' || hovering && status == 'inStock' ? '1' : '0.8',
            transform: hovering && status == 'inCart' || hovering && status == 'inStock' ? 'scale(1.2, 1.2)' : 'scale(1, 1)',
          }"
      >
        <use xlink:href="#plus"></use>
      </svg>
      <div class="text" 
          :style="{
            opacity: hovering && status == 'inCart' || hovering && status == 'inStock' ? '1' : '0.8'
          }"
        >
        В корзину</div>
    </div>
    <div v-if="dailyMenuOrder.getItemQuantity(dailyMenuItem) > 0" class="inblock">
      <svg class="icon-minus" @click="dailyMenuOrder.decreaseDailyMenuOrderItem(dailyMenuItem)">
        <use xlink:href="#minus"></use>
      </svg>
      <div class="text">{{ dailyMenuOrder.getItemQuantity(dailyMenuItem) }}</div>
      <svg class="icon-plus" @click="dailyMenuOrder.increaseDailyMenuOrderItem(dailyMenuItem)">
        <use xlink:href="#plus"></use>
      </svg>
    </div>
    <div v-if="dailyMenuItem.cook" class="inblock">
      <svg class="icon-loader">
        <use xlink:href="#loader"></use>
      </svg>
      <div class="text">Готовится</div>
    </div>
    <div v-if="dailyMenuItem.tomorrowAvailable" class="inblock">
      <div
        class="text"
        :style="{
          fontSize: status == 'tomorrow' ? '12px' : '14px',
        }"
      >
        Доступно завтра
      </div>
    </div>
  </div>
  <Icons />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref } from 'vue';

import Icons from '@/assets/svg/Button/Icons.svg';
import DailyMenuItem from '@/classes/DailyMenuItem';
import DailyMenuOrder from '@/classes/DailyMenuOrder';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'DishCardButton',
  components: { Icons },
  props: {
    dailyMenuItem: {
      type: Object as PropType<DailyMenuItem>,
      required: true,
    },
    marginTop: {
      type: String as PropType<string>,
      required: false,
      default: '0px',
    },
    marginRight: {
      type: String as PropType<string>,
      required: false,
      default: '0px',
    },

    height: {
      type: String as PropType<string>,
      required: false,
      default: '34px',
    },

    width: {
      type: String as PropType<string>,
      required: false,
      default: '138px',
    },

    status: {
      type: String as PropType<string>,
      required: false,
      default: 'inCart',
    },
  },
  setup() {
    const select: Ref<boolean> = ref(false);
    const dailyMenuOrder: Ref<DailyMenuOrder> = computed(() => Provider.store.getters['dailyMenuOrders/item']);
    const hovering = ref(false);

    const handClick = () => {
      select.value = !select.value;
    };

    return {
      dailyMenuOrder,
      handClick,
      select,
      hovering,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.icon-plus {
  width: 16px;
  height: 16px;
  fill: #ffffff;
  cursor: pointer;
  transition: 0,3s;
  opacity: 0.8;
}

.icon-plus:hover {
  transform: scale(1.2, 1.2);
  opacity: 1;
}

.icon-plus:active {
  transform: scale(1.2, 1.2);
  opacity: 0.8;
}

.icon-minus {
  width: 16px;
  height: 16px;
  fill: #ffffff;
  cursor: pointer;
  transition: 0,3s;
  opacity: 0.8;
}

.icon-minus:hover {
  transform: scale(1.2, 1.2);
  opacity: 1;

}

.icon-minus:active {
  transform: scale(1.2, 1.2);
  opacity: 0.8;
}

.icon-loader {
  width: 16px;
  height: 16px;
  stroke: #a1a7bd;
  cursor: pointer;
  transition: 0.3s;
  padding-right: 10px;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  border: $normal-border;
  cursor: pointer;
  transition: 0.3s;
  margin: 0 15px;
}


.inblock {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 15px;
}

.text {
  max-width: 260px;
  font-size: 14px;
  padding: 0;
  letter-spacing: 1px;
  line-height: 1.1;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

</style>
