<template>
  <svg :width="width" :height="height" class="sub-menu-icon" :fill="color" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <slot />
  </svg>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseIcon',
  props: {
    width: {
      type: Number,
      required: false,
      default: 20,
    },
    height: {
      type: Number,
      required: false,
      default: 20,
    },
    color: {
      type: String,
      required: false,
      default: '#000000',
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
* {
  padding: 0;
  margin: 0;
}
</style>
