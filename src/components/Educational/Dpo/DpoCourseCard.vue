<template>
  <div class="card-item flex-column">
    <div class="flex-row">
      <div>
        <div class="doctor-name" @click="$router.push(`/dpo/courses/${dpoCourse.id}`)">
          {{ dpoCourse.name }}
        </div>
        <div class="spec-list">
          <div class="tag-link" @click="$router.push(`/doctors/${dpoCourse.teacher.doctor.human.slug}`)">
            Преподаватель: {{ dpoCourse.teacher.doctor.human.getFullName() }}
          </div>
        </div>
      </div>
    </div>
    <div class="address">
      Часов:
      {{ dpoCourse.hours }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IDpoCourse from '@/interfaces/IDpoCourse';

export default defineComponent({
  name: 'DpoCourseCard',
  components: {},
  props: {
    dpoCourse: { type: Object as PropType<IDpoCourse>, required: true },
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
