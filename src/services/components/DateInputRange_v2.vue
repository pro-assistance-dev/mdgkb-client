<template>
  <div class="date-range">
    <slot />
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DateInputRangeV2',
});
</script>

<style scoped lang="scss">
@import '@/services/assets/style/index.scss';

.date-range {
  display: flex;
  max-width: 300px;
  justify-content: left;
}

</style>
