<template>
  <button class="ButtonClose">
    <BaseIcon name="x" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

import BaseIcon from '@/components/Base/BaseIcon.vue';
export default defineComponent({
  name: 'BaseModalButtonClose',
  components: {
    BaseIcon,
  },
});
</script>

<style scoped lang="scss">
.ButtonClose {
  outline: none;
  border: none;
  background: none;
  padding-top: 2px;
  padding-right: 5px;
}
</style>
