<template>
  <CollapsContainer v-if="doctor.educations.length" tab-id="1" :collapsed="false">
    <template #inside-title>
      <div class="title-in">Образование</div>
    </template>  
    <template #inside-content>
      <div v-if="doctor.educations.length" class="education">
        <div class="point">
          <ul class="point-list">
            <li v-for="education in doctor.educations" :key="education.id" class="point-list-item">
              <div class="point-info">
                <h3 class="point-year">{{ education.getEndYear() }}</h3>
                <h4 class="point-text">{{ education.institution }}. {{ education.type }}. {{ education.specialization }}</h4>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </template>  
  </CollapsContainer>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IDoctor from '@/interfaces/IDoctor';
import CollapsContainer from '@/components/Main/CollapsContainer/CollapsContainer.vue'

export default defineComponent({
  name: 'DoctorEducation',
  components: { CollapsContainer },
  props: {
    doctor: { type: Object as PropType<IDoctor>, required: true },
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

.education {
  display: block;
  background-clip: padding-box;
  margin-top: 30px;
  padding: 0px 40px 0px 23px;
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

/* Decoration of lists */

.point-list {
  padding-left: 0;
  margin: 0;
  list-style: none;
}

.point-list-item {
  margin-bottom: 1rem;
  padding-left: 25px;
  position: relative;
}

.point-list-item:before {
  content: '';
  position: absolute;
  top: 3px;
  left: 0;
  width: 10px;
  height: 10px;
  border: 2px solid $site_gray;
  background-color: #ffffff;
  border-radius: 50%;
  z-index: 2;
}

.point-list-item:after {
  content: '';
  position: absolute;
  top: -8px;
  left: 6px;
  width: 2px;
  height: calc(100% + 3rem);
  background-color: $site_gray;
}

.point-list-item:last-of-type:after {
  height: calc(100% + 1.3rem);
}
</style>
