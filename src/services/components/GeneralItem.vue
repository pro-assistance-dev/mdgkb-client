<template>
  <div class="general-block-item" :style="{
    background: background,
    height: height,
    width: width,
    borderColor: borderColor,
    padding: padding,
    margin: margin,
    transform: scale ? (hovering ? 'scale(1.03, 1.03)' : '') : '',
  }" @mouseenter="hovering = true" @mouseleave="hovering = false">
    <div class="green" :style="{
      width: `${ready}`,
    }"></div>
    <div class="general-block-item-title" :style="{
      fontSize: fontSize,
    }">
      <slot name="general-item" />
    </div>
    <div class="tools-icon" :style="{
      display: withIcon ? 'flex' : 'none',
    }">
      <svg class="icon-del">
        <use xlink:href="#del"></use>
      </svg>
    </div>
    <svg width="0" height="0" class="hidden">
      <symbol id="del" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
        <path
          d="M2.91797 8.75C2.6888 8.75 2.49255 8.66833 2.32922 8.505C2.16589 8.34167 2.08436 8.14556 2.08464 7.91667V2.5H1.66797V1.66667H3.7513V1.25H6.2513V1.66667H8.33464V2.5H7.91797V7.91667C7.91797 8.14583 7.8363 8.34208 7.67297 8.50542C7.50964 8.66875 7.31352 8.75028 7.08464 8.75H2.91797ZM7.08464 2.5H2.91797V7.91667H7.08464V2.5ZM3.7513 7.08333H4.58464V3.33333H3.7513V7.08333ZM5.41797 7.08333H6.2513V3.33333H5.41797V7.08333Z">
        </path>
      </symbol>
    </svg>
  </div>
  <!-- borderColor: scale ? borderColor : (hovering ? '#379fff' : borderColor), -->
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'GeneralItem',
  props: {
    background: {
      type: String as PropType<string>,
      required: false,
      default: '#ffffff',
    },
    height: {
      type: String as PropType<string>,
      required: false,
      default: '40px',
    },
    width: {
      type: String as PropType<string>,
      required: false,
      default: 'auto',
    },

    ready: {
      type: String as PropType<string>,
      required: false,
      default: '0%',
    },
    padding: {
      type: String as PropType<string>,
      required: false,
      default: '10px',
    },
    borderColor: {
      type: String as PropType<string>,
      required: false,
      default: '#343D5C',
    },
    margin: {
      type: String as PropType<string>,
      required: false,
      default: '5px',
    },
    scale: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: true,
    },
    fontSize: {
      type: String as PropType<string>,
      required: false,
      default: '14px',
    },
    withIcon: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
  },

  setup() {
    const hovering = ref(false);

    return {
      hovering,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.hidden {
  display: none;
}

.general-block-item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
  border-radius: $border-radius;
  border: $custom-border;
  text-align: center;
  overflow: hidden;
}

.green {
  position: absolute;
  background: #c7ecea;
  top: 0;
  left: 0;
  width: 80%;
  height: 100%;
}

.general-block-item-title {
  font-size: 12px;
  color: #343e5c;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 1;
}

.icon-del {
  width: 32px;
  height: 32px;
  cursor: pointer;
  fill: #343e5c;
}

.icon-del:hover {
  fill: #1979cf;
}

.tools-icon {
  display: flex;
  justify-content: right;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
}
</style>
