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
  >
    <div v-if="status == 'inStock'" class="inblock">
      <svg class="icon-plus">
        <use xlink:href="#plus"></use>
      </svg>
      <div class="text">В корзину</div>
    </div>
    <div v-if="status == 'inCart'" class="inblock">
      <svg class="icon-minus">
        <use xlink:href="#minus"></use>
      </svg>
      <div class="text">1</div>
      <svg class="icon-plus">
        <use xlink:href="#plus"></use>
      </svg>
    </div>
    <div v-if="status == 'preparing'" class="inblock">
      <svg class="icon-loader">
        <use xlink:href="#loader"></use>
      </svg>
      <div class="text">Готовится</div>
    </div>
    <div v-if="status == 'tomorrow'" class="inblock">
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
import { defineComponent, PropType, Ref, ref } from 'vue';

import Icons from '@/assets/svg/Button/Icons.svg';

export default defineComponent({
  name: 'Button',
  components: { Icons },
  props: {
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
      default: 'inStock',
    },
  },
  setup() {
    const select: Ref<boolean> = ref(false);

    const handClick = () => {
      select.value = !select.value;
    };

    return {
      handClick,
      select,
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
  transition: 0.3s;
}

.icon-minus {
  width: 16px;
  height: 16px;
  fill: #ffffff;
  cursor: pointer;
  transition: 0.3s;
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
}
</style>
