<template>
  <div class="card-item flex-column">
    <div class="flex-row">
      {{ division.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IDivision from '@/interfaces/buildings/IDivision';

export default defineComponent({
  name: 'DivisionCard',
  components: {},
  props: {
    division: { type: Object as PropType<IDivision>, required: true },
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
