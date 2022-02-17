<template>
  <div class="card-item flex-column">
    <div class="flex-row">
      {{ center.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import ICenter from '@/interfaces/ICenter';

export default defineComponent({
  name: 'CenterCard',
  props: {
    center: { type: Object as PropType<ICenter>, required: true },
  },
  setup() {
    const errorImg = (event: Event) => {
      if (event.target) {
        (event.target as HTMLImageElement).src = require('@/assets/img/doctor-default.png');
      }
    };

    return {
      errorImg,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/doctor-info-card.scss';
</style>
