<template>
  <div
    v-if="!isClose"
    class="body"
    :style="{
      maxWidth: width,
      background: background,
      margin: margin,
      border: border,
    }"
  >
    <div
      class="icon-close"
      :style="{
        display: iconClose ? 'flex' : 'none',
      }"
    >
      <slot name="icon" />
    </div>
    <div
      class="title"
      :style="{
        background: background,
        color: color,
      }"
    >
      <slot name="title" />
    </div>

    <div class="info">
      <slot name="info" />
    </div>
    <div class="button">
      <slot name="button" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'StartModal',
  props: {
    isClose: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    width: {
      type: String as PropType<string>,
      required: false,
      default: '970px',
    },
    background: {
      type: String as PropType<string>,
      required: false,
      default: '#ffffff',
    },

    border: {
      type: String as PropType<string>,
      required: false,
      default: '1px solid #c3c3c3',
    },

    color: {
      type: String as PropType<string>,
      required: false,
      default: '#ffffff',
    },

    margin: {
      type: String as PropType<string>,
      reguired: false,
      default: '10px',
    },

    iconClose: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.body {
  width: calc(100% - 20px);
  position: fixed;
  top: 20vh;
  left: 50%;
  transform: translateX(-50%);
  min-height: 0px;
  max-height: 100vh;
  border-radius: $border-radius;
  padding: 20px;
  overflow: hidden;
  z-index: 101;
  box-sizing: border-box;
  margin: 0 10px;
}

.icon-close {
  width: auto;
  height: auto;
  position: absolute;
  top: 23px;
  right: 20px;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  width: calc(100% - 30px);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 20px;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  letter-spacing: 1px;
  color: #ffffff;
}

.info {
  margin-top: 30px;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
}
</style>
