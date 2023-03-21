<template>
  <div
    class="body"
    :style="{
      marginTop: marginTop,
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'BufetFilters',
  props: {
    marginTop: {
      type: String as PropType<string>,
      required: false,
      default: '30px',
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.body {
  display: flex;
  align-items: center;
  justify-content: left;
  height: auto;
}

@media screen and (max-width: 400px) {
  .body {
    justify-content: space-between;
    height: auto;
  }
}
</style>
