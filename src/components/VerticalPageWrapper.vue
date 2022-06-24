<template>
  <div class="page-wrapper-container">
    <slot name="menu" />
    <h2 v-if="title">{{ title }}</h2>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'VerticalPageWrapper',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
.page-wrapper-container {
  display: flex;
  align-items: left;
  width: 100%;
}
</style>
