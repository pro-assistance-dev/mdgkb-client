<template>
  <div
    class="mainblock"
    :style="{
      background: background,
      padding: padding,
    }"
  >
    <div
      class="mainblock-header"
      :style="{
        background: background,
      }"
    >
      <slot name="header" />
    </div>
    <div class="mainblock-body">
      <slot name="body" />
    </div>

    <div class="mainblock-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'ResearcheContainer',
  props: {
    background: {
      type: String as PropType<string>,
      required: false,
      default: 'inherit',
    },
    padding: {
      type: String as PropType<string>,
      required: false,
      default: '0px 10px',
    },
  },
  setup() {
    let autoHeight: number;
    autoHeight = window.innerHeight;

    return {
      autoHeight,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.mainblock {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: auto;
}

.mainblock-header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 3;
}

.mainblock-body {
  width: 100%;
  padding-bottom: 70px;
}

.mainblock-footer {
  width: 100%;
  height: auto;
}
</style>
