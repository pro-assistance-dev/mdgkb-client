<template>
  <CollapseItem
    v-if="doctor.employee.regalias.length || doctor.employee.academicDegree.length > 1 || doctor.employee.academicRank.length > 1"
    tab-id="10"
    :collapsed="false"
  >
    <template #inside-title>
      <div class="title-in">Достижения и награды</div>
    </template>
    <template #inside-content>
      <div
        v-if="doctor.employee.regalias.length || doctor.employee.academicDegree.length > 1 || doctor.employee.academicRank.length > 1"
        data-test="achievements-component"
        class="services"
      >
        <div class="point">
          <ul class="services-list">
            <li v-if="doctor.employee.academicDegree.length > 1" data-test="academic-degree" class="services-list-item">
              <h4 class="point-text">{{ doctor.employee.academicDegree }}</h4>
            </li>
            <li v-if="doctor.employee.academicRank.length > 1" data-test="academic-rank" class="services-list-item">
              <h4 class="point-text">{{ doctor.employee.academicRank }}</h4>
            </li>
            <li v-for="regalia in doctor.employee.regalias" :key="regalia.id" data-test="regalia-list" class="services-list-item">
              <h4 class="point-text">{{ regalia.name }}</h4>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </CollapseItem>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Doctor from '@/classes/Doctor';
import CollapseItem from '@/components/Main/Collapse/CollapseItem.vue';

export default defineComponent({
  name: 'DoctorAchievements',
  components: { CollapseItem },
  props: {
    doctor: { type: Object as PropType<Doctor>, required: true },
  },
});
</script>
<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';
* {
  padding: 0px;
  margin: 0px;
}

*,
::after,
::before {
  box-sizing: initial;
}

html,
body {
  height: 100%;
}

html {
  scroll-behavior: smooth;
}

.title-in {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 22px;
  letter-spacing: 0.1em;
  color: $site_dark_gray;
  height: 60px;
  align-items: center;
  font-weight: bold;
}

.point {
  display: flex;
  margin: 0px 0px 20px 20px;
}

.point-info {
  display: block;
  height: auto;
  margin: 10px 0px 0px 5px;
}

.point-year {
  display: flex;
  font-family: $title-font;
  letter-spacing: $doctor-text-letter-spacing;
  font-size: 14px;
  color: $site_gray;
  font-weight: $title-font-bold-weight;
}

.point-text {
  display: flex;
  font-family: $title-font;
  letter-spacing: $doctor-text-letter-spacing;
  font-size: $doctor-text-font-size;
  color: $site_dark_gray;
  font-weight: $doctor-text-font-weight;
  line-height: $doctor-text-line-height;
}

.services {
  display: block;
  background-clip: padding-box;
  margin-top: 30px;
  padding: 0px 40px 0px 23px;
}

.services-list {
  padding-left: 0;
  margin: 0;
  list-style: none;
}

.services-list-item {
  margin-bottom: 0.5rem;
  padding-left: 25px;
  position: relative;
  margin-left: 10px;
}

.services-list-item:before {
  content: '';
  position: absolute;
  top: 4px;
  left: 0;
  width: 7px;
  height: 7px;
  background-color: #2655eb;
  border-radius: 50%;
}
</style>
