<template>
  <div
    class="body"
    :style="{
      width: width,
      background: background,
      margin: margin,
      border: border,
    }"
  >
    <div
      class="icon-close"
      :style="{
        display: iconClose ? 'block' : 'none',
      }"
    >
      <slot name="icon" />
    </div>
    <div
      class="title"
      :style="{
        marginRight: iconClose ? '20px' : '0',
      }"
    >
      <slot name="title" />
    </div>
    <div class="line">
      <div
        class="line-left"
        :style="{
          background: leftBackground,
          border: borderInside ? border : 'none',
        }"
      >
        <slot name="left" />
      </div>
      <div
        class="line-right"
        :style="{
          background: rightBackground,
        }"
      >
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'CartContainer',
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

    leftBackground: {
      type: String as PropType<string>,
      required: false,
      default: '',
    },
    rightBackground: {
      type: String as PropType<string>,
      required: false,
      default: '',
    },

    borderInside: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },

    border: {
      type: String as PropType<string>,
      required: false,
      default: '1px solid #c3c3c3',
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
@import '@/assets/styles/base-style.scss';

.body {
  position: relative;
  min-height: 0px;
  max-height: 100vh;
  border-radius: $border-radius;
  padding: 16px;
}

.icon-close {
  width: auto;
  height: auto;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
}

.title {
  height: 24px;
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
  height: auto;
  overflow: hidden;
  overflow-y: auto;
}
.line-left {
  width: calc(100% - 34px);
  margin-top: 16px;
  margin-right: 24px;
  border-radius: $border-radius;
  padding: 5px;
}

.line-right {
  width: 320px;
  padding-top: 16px;
}

@media screen and (max-width: 960px) {
  .body {
    width: auto;
  }
  .line {
    max-height: calc(90vh - 20px);
    display: block;
  }

  .line-left {
    width: 100%;
    padding: 0;
    margin: 16px 0 0 0;
  }

  .line-right {
    width: auto;
    padding-top: 0px;
  }
}

@media screen and (max-width: 400px) {
  .body {
    width: auto;
    padding: 16px 10px 5px 10px;
  }
}
</style>
