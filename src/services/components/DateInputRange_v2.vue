<template>
  <div class="date-range">
    <slot />
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DateInputRange_v2',
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.date-range {
  display: flex;
  max-width: 300px;
  justify-content: left;
}

</style>
