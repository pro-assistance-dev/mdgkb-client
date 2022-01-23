<template>
  <el-rate
    :model-value="countRating(doctor.doctorComments)"
    size="large"
    disabled
    void-color="#A1A7BD"
    disabled-void-color="#A1A7BD"
    :colors="['#FF4D3B', '#FF4D3B', '#FF4D3B']"
  >
  </el-rate>
  <a class="doctor-reviews" @click="$scroll('reviews')">{{ doctor.doctorComments.length }} отзывов</a>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IDoctor from '@/interfaces/IDoctor';
import countRating from '@/mixins/countRating';

export default defineComponent({
  name: 'DoctorRating',
  props: {
    doctor: {
      type: Object as PropType<IDoctor>,
      required: true,
    },
  },

  setup() {
    return { countRating };
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-rate__icon) {
  margin: 0;
  font-size: 20px;
}
.el-rate {
  margin-bottom: 5px;
}
a {
  color: #2754eb;
  text-decoration: none;
  letter-spacing: 1px;
  font-weight: bold;
  font-size: 11px;
  &:hover {
    color: darken(#2754eb, 10%);
    cursor: pointer;
  }
}
</style>
