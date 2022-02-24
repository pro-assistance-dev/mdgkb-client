<template>
  <div class="card-item flex-column">
    <div class="flex-row">
      <div>
        <div class="doctor-name" @click="$router.push({ name: `DoctorPage`, params: { slug: teacher.doctor.human.slug } })">
          {{ teacher.doctor.human.getFullName() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import ITeacher from '@/interfaces/ITeacher';

export default defineComponent({
  name: 'TeacherCard',
  components: {},
  props: {
    teacher: { type: Object as PropType<ITeacher>, required: true },
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
