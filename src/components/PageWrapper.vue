<template>
  <div class="page-wrapper-container">
    <slot name="filters" />
    <h2 v-if="title">{{ title }}</h2>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'PageWrapper',
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
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
