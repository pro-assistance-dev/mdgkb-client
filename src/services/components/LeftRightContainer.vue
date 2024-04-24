<template>
  <div class="mainblock">
    <div class="mainline">
      <div
        class="mainblock-left"
        :style="{
          minWidth: leftWidth,
          maxWidth: leftWidth,
          background: background,
          display: leftWidth !== '0px' ? 'block' : 'none',
        }"
      >
        <slot name="left" />
      </div>
      <div
        class="mainblock-right"
        :style="{
          background: background,
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
  name: 'LeftRightContainer',
  props: {
    leftWidth: {
      type: String as PropType<string>,
      required: false,
      default: '0px',
    },
    background: {
      type: String as PropType<string>,
      required: false,
      default: 'inherit',
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.mainblock {
  box-sizing: border-box;
  display: flex;
  justify-content: left;
  width: auto;
  height: auto;
  padding: 10px;
}

.mainline {
  display: flex;
  justify-content: left;
  width: 100%;
  height: auto;
}

.mainblock-left {
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
}

.mainblock-right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: right;
  width: calc(100% - 10px);
  padding-left: 10px;
  box-sizing: border-box;
}

@media screen and (max-width: 600px) {
  .mainblock {
    padding: 10px 0;
  }
  .mainline {
    display: block;
  }

  .mainblock-right {
    margin-top: 20px;
    padding-left: 0;
  }
}
</style>
