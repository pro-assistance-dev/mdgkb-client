<template>
  <div
    class="body"
    :style="{
      width: width,
    }"
  >
    <div class="title">
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
  name: 'ClickWindow',
  props: {
    width: {
      type: String as PropType<string>,
      required: false,
      default: 'auto',
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.body {
  width: auto;
  height: auto;
  padding: 10px;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #343e5c;
  width: 100%;
}

.info {
  display: block;
  width: 100%;
  margin-top: 5px;
}
</style>
