<template>
  <div
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
      }"
    >
      <slot name="title" />
    </div>

    <div class="info">
      <slot name="info" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'BaseModal',
  props: {
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

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';

.body {
  width: 100%;
  position: relative;
  min-height: 0px;
  max-height: 100vh;
  border-radius: $normal-border-radius;
  padding: 0;
  overflow: hidden;
}

.icon-close {
  width: auto;
  height: auto;
  position: absolute;
  top: 17px;
  right: 10px;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 40px);
  z-index: 1;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 24px;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  letter-spacing: 1px;
  color: #343e5c;
  color: #ffffff;
  padding: 0 30px 0 10px;
  // box-shadow: $normal-shadow;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
}

.info {
  margin-top: 50px;
}

@media screen and (max-width: 400px) {
  // .body {
  //   margin: 5px;
  //   padding: 10px 0;
  // }
  .title {
    margin: 0 20px 0 0;
  }
}
</style>
