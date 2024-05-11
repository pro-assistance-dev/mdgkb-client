<template>
  <div class="info-block">
    <div class="info-block-child">
      <div v-if="doctor.description" class="item">
        <svg class="icon-smile">
          <use xlink:href="#lucide_smile"></use>
        </svg>
        <div class="title">{{ doctor.description }}</div>
      </div>
      <div v-if="doctor.description" class="hidden-comment">{{ doctor.description }}</div>
    </div>
    <div class="info-block-child">
      <div v-if="doctor.employee.teachingActivities.length > 0" class="item">
        <svg class="icon-cap">
          <use xlink:href="#la_graduation-cap"></use>
        </svg>
        <div class="title">Педагогическая деятельность</div>
      </div>
      <div v-if="doctor.employee.teachingActivities.length > 0" class="hidden-comment">
        <div v-for="teaching in doctor.employee.teachingActivities" :key="teaching.id">{{ teaching.name }}</div>
      </div>
    </div>
  </div>
  <Smile />
  <Cap />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Cap from '@/assets/doctors/svg/Cap.svg';
import Smile from '@/assets/doctors/svg/Smile.svg';
import Doctor from '@/classes/Doctor';

export default defineComponent({
  name: 'WorkAndTeaching',
  components: {
    Smile,
    Cap,
  },
  props: {
    doctor: { type: Object as PropType<Doctor>, required: true },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.info-block {
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
}
.info-block-child {
  position: relative;
}

.icon-smile {
  width: 32px;
  height: 32px;
  fill: #ffffff;
  stroke: #31ae5e;
}

.icon-cap {
  width: 42px;
  height: 42px;
  fill: #31ae5e;
}

.title {
  width: 50%;
  font-size: 12px;
  font-weight: $title-font-bold-weight;
  width: 130px;
  padding: 0;
  line-height: 110%;
  height: 26px;
  overflow: hidden;
  margin: 0 20px 0 10px;
  text-overflow: ellipsis;
}
.item {
  display: flex;
  justify-content: left;
  align-items: center;
  height: 42px;
}

.hidden-comment {
  width: 360px;
  position: absolute;
  bottom: 50px;
  left: -105px;
  font-size: 12px;
  font-weight: $title-font-weight;
  padding: 15px 20px;
  border-radius: $border-radius;
  border: $normal-border;
  color: #ffffff;
  background: $site_dark_gray;
  display: none;
  opacity: 0.95;
  z-index: 1;
}

.hidden-comment:after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -30px;
  margin-left: -16px;
  border: 16px solid transparent;
  border-top: 20px solid $site_dark_gray;
}

.item:hover {
  cursor: pointer;
  color: #000000;
}

.item:hover ~ .hidden-comment {
  display: block;
}
</style>
