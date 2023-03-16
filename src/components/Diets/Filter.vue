<template>
  <div
    class="button"
    :style="{
      marginTop: marginTop,
      background: background,
      color: color,
      height: height,
      borderRadius: height,
      width: width,
      background: select ? background : '#ffffff',
      color: select ? '#ffffff' : color,
    }"
    @click="handClick"
  >
    <div class="text">{{ text }}</div>
    <svg
      v-if="select"
      class="icon-close"
      :style="{
        fill: '#ffffff',
      }"
    >
      <use xlink:href="#close"></use>
    </svg>
  </div>
  <Close />
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue';

import Close from '@/assets/svg/Filter/Close.svg';

export default defineComponent({
  name: 'Filter',
  components: { Close },
  props: {
    marginTop: {
      type: String as PropType<string>,
      required: false,
      default: '0px',
    },

    text: {
      type: String as PropType<string>,
      required: false,
      default: 'Имя фильтра',
    },

    background: {
      type: String as PropType<string>,
      required: false,
      default: '#ffffff',
    },

    color: {
      type: String as PropType<string>,
      required: false,
      default: '#343e5c',
    },

    height: {
      type: String as PropType<string>,
      required: false,
      default: '34px',
    },

    width: {
      type: String as PropType<string>,
      required: false,
      default: 'auto',
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

.icon-close {
  width: 16px;
  height: 16px;
  cursor: pointer;
  transition: 0.3s;
  padding-left: 10px;
}

.button {
  display: flex;
  align-items: center;
  padding: 0 14px 0 20px;
  width: auto;
  border: $normal-border;
  cursor: pointer;
  transition: 0.3s;
  margin-right: 20px;
}

.text {
  max-width: 260px;
  font-weight: bold;
  font-size: 15px;
  padding: 0;
  letter-spacing: 1px;
  line-height: 1.1;
}

@media screen and (max-width: 500px) {
  .text {
    font-size: 12px;
  }
  .button {
    padding: 0 6px 0 10px;
  }
  .icon-close {
    width: 10px;
    height: 10px;
    padding-left: 4px;
  }
}

@media screen and (max-width: 400px) {
  .text {
    font-size: 12px;
  }
  .button {
    margin-right: 0px;
    padding: 0 6px 0 10px;
  }
  .icon-close {
    width: 10px;
    height: 10px;
    padding-left: 4px;
  }
}
</style>
