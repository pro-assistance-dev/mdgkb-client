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
    @click.prevent="handClick"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div v-if="dailyMenuItem.cook" class="inblock">
      <svg class="icon-loader">
        <use xlink:href="#loader"></use>
      </svg>
      <div class="text">Готовится</div>
    </div>
    <div v-else-if="dailyMenuItem.tomorrowAvailable" class="inblock">
      <div
        class="text"
        :style="{
          fontSize: status == 'tomorrow' ? '12px' : '14px',
        }"
      >
        Доступно завтра
      </div>
    </div>
    <div
      v-else-if="dailyMenuOrder.getItemQuantity(dailyMenuItem) === 0"
      class="inblock"
      @click.prevent="clickPlus"
    >
      <svg
        class="icon-plus"
        :style="{
          opacity: (hovering && status == 'inCart') || (hovering && status == 'inStock') ? '1' : '0.8',
          transform: (hovering && status == 'inCart') || (hovering && status == 'inStock') ? 'scale(1.2, 1.2)' : 'scale(1, 1)',
        }"
      >
        <use xlink:href="#plus"></use>
      </svg>
      <div
        class="text"
        :style="{
          opacity: (hovering && status == 'inCart') || (hovering && status == 'inStock') ? '1' : '0.8',
        }"
      >
        В корзину
      </div>
    </div>

    <div v-else-if="dailyMenuOrder.getItemQuantity(dailyMenuItem) > 0" class="inblock">
      <svg class="icon-minus" @click="dailyMenuOrder.decreaseDailyMenuOrderItem(dailyMenuItem)">
        <use xlink:href="#minus"></use>
      </svg>
      <div class="text">{{ dailyMenuOrder.getItemQuantity(dailyMenuItem) }}</div>
      <svg class="icon-plus" @click="dailyMenuOrder.increaseDailyMenuOrderItem(dailyMenuItem)">
        <use xlink:href="#plus"></use>
      </svg>
    </div>
    <Icons />
  </div>
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
  setup(props) {
    const select: Ref<boolean> = ref(false);
    const dailyMenuOrder: Ref<DailyMenuOrder> = computed(() => Provider.store.getters['dailyMenuOrders/item']);
    const hovering = ref(false);

    const handClick = () => {
      select.value = !select.value;
    };

    const move_to_cart = () => {
      const container = document.getElementById('container');
      const product = document.getElementById(`${props.dailyMenuItem.id}`);
      const cart = document.getElementById('svgcart');

      if (product && cart && container) {

        const coordProduct = product.getBoundingClientRect();
      
        const coordCart = cart.getBoundingClientRect();
        const time = 500;
        let cloneProduct = <HTMLElement> product.cloneNode(true);

        const styleObject = {
          position: 'fixed',
          left: coordProduct.left + 'px',
          top: coordProduct.top + 'px',
          margin: 0,
          border: '3px solid #31AF5E',
          zIndex: 11,
        };

        Object.assign(cloneProduct.style, styleObject);
        container.appendChild(cloneProduct);

        const topSize = coordProduct.top - coordCart.bottom + ((coordCart.height + coordProduct.height) / 2);
        const leftSize =  coordCart.left - coordProduct.right + ((coordCart.width + coordProduct.width) / 2);
        let start: number|null = null;

        window.requestAnimationFrame(function animate (timestamp) {
          if (!start) {
            start = timestamp;
          };
          let progress = timestamp - start;
          let value = progress / time;
          const sizeY = (topSize * value) * -1;
          const sizeX = (leftSize * value);

          const scale = 1 - value;

          if (topSize * value <  topSize) {
              cloneProduct.style.transform = `translate3d(${sizeX + "px"}, ${sizeY + "px"}, 0) scale3d(${scale}, ${scale}, 1)`;
              return window.requestAnimationFrame(animate);
          };
          cloneProduct.remove();
        });
      };
    };

    const clickPlus = ()  => {
      dailyMenuOrder.value.increaseDailyMenuOrderItem(props.dailyMenuItem);
      move_to_cart();
    };

    return {
      dailyMenuOrder,
      handClick,
      select,
      hovering,
      clickPlus,
      move_to_cart,
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
  transition: 0, 3s;
  opacity: 0.8;
  padding: 9px;
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
  transition: 0, 3s;
  opacity: 0.8;
  padding: 9px;
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
