<template>
  <div class="card-item flex-column">
    <div class="flex-row">
      <div>
        <div class="doctor-name" @click="$router.push({ name: `DoctorPage`, params: { slug: educationalManager.doctor.human.slug } })">
          {{ educationalManager.doctor.human.getFullName() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IEducationalManager from '@/interfaces/IEducationalManager';

export default defineComponent({
  name: 'EducationalManagerCard',
  components: {},
  props: {
    educationalManager: { type: Object as PropType<IEducationalManager>, required: true },
  },
  setup() {
    const errorImg = (event: Event) => {
      if (event.target) {
        (event.target as HTMLImageElement).src = require('@/assets/img/doctor-default.webp');
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

.tag-link {
  margin: 2px;
  font-size: 10px;
  transition: all 0.2s;
  border-color: blue;
  border-radius: 20px;
  &:hover {
    background-color: blue;
    color: white;
    cursor: pointer;
  }
}
</style>
