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
      <div v-if="doctor.teachingActivities.length > 0" class="item">
        <svg class="icon-cap">
          <use xlink:href="#la_graduation-cap"></use>
        </svg>
        <div class="title">Педагогическая деятельность</div>
      </div>
      <div v-if="doctor.teachingActivities.length > 0" class="hidden-comment">
        <div v-for="teaching in doctor.teachingActivities" :key="teaching.id">{{ teaching.name }}</div>
      </div>
    </div>
  </div>
  <svg width="0" height="0" class="hidden">
    <symbol id="lucide_smile" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14M9 9H9.01M15 9H15.01"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </symbol>
    <symbol id="la_graduation-cap" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path
        d="M16.0005 4.875L15.5315 5.125L2.0315 12.125L0.3125 13L2.0005 13.844V22.281C1.4025 22.629 1.0005 23.261 1.0005 24C1.0005 24.5304 1.21121 25.0391 1.58629 25.4142C1.96136 25.7893 2.47007 26 3.0005 26C3.53093 26 4.03964 25.7893 4.41471 25.4142C4.78979 25.0391 5.0005 24.5304 5.0005 24C5.0005 23.262 4.5985 22.629 4.0005 22.281V14.875L6.0005 15.906V21C6.0005 21.441 6.2035 21.84 6.4385 22.094C6.6725 22.348 6.9575 22.5 7.2505 22.656C7.8405 22.965 8.5405 23.184 9.4065 23.375C11.1415 23.762 13.4535 24 16.0005 24C18.5475 24 20.8605 23.762 22.5945 23.375C23.4615 23.184 24.1605 22.965 24.7505 22.656C25.0435 22.5 25.3285 22.348 25.5635 22.094C25.838 21.795 25.9935 21.4058 26.0005 21V15.906L29.9695 13.875L31.6875 13L29.9695 12.125L16.4695 5.125L16.0005 4.875ZM16.0005 7.125L27.3135 13L25.5315 13.906C25.3035 13.6774 25.0397 13.4876 24.7505 13.344C24.1645 13.035 23.4605 12.816 22.5945 12.625C20.8645 12.238 18.5595 12 16.0005 12C13.4415 12 11.1375 12.238 9.4065 12.625C8.5395 12.816 7.8365 13.035 7.2505 13.344C6.9613 13.4876 6.6975 13.6774 6.4695 13.906L4.6875 13L16.0005 7.125ZM16.0005 14C18.4415 14 20.6375 14.223 22.1565 14.563C22.9145 14.73 23.5235 14.926 23.8445 15.093C23.9455 15.148 23.9615 15.188 24.0005 15.219V19.031C23.5414 18.8645 23.0717 18.7289 22.5945 18.625C20.8595 18.238 18.5475 18 16.0005 18C13.4535 18 11.1405 18.238 9.4065 18.625C8.8755 18.742 8.4185 18.879 8.0005 19.031V15.22C8.0405 15.189 8.0555 15.15 8.1565 15.095C8.4765 14.927 9.0865 14.731 9.8445 14.564C11.3645 14.223 13.5595 14 16.0005 14ZM16.0005 20C18.4265 20 20.6335 20.223 22.1565 20.563C22.6284 20.6621 23.089 20.8085 23.5315 21C23.0891 21.1919 22.6284 21.3386 22.1565 21.438C20.6335 21.778 18.4265 22 16.0005 22C13.5745 22 11.3675 21.777 9.8445 21.437C9.37264 21.3379 8.91197 21.1915 8.4695 21C8.91194 20.8081 9.3726 20.6614 9.8445 20.562C11.3675 20.223 13.5745 20 16.0005 20Z"
      ></path>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IDoctor from '@/interfaces/IDoctor';

export default defineComponent({
  name: 'WorkAndTeaching',
  props: {
    doctor: { type: Object as PropType<IDoctor>, required: true },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

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
  line-height: 100%;
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
  border-radius: $normal-border-radius;
  border: $normal-border;
  color: #ffffff;
  background: $site_dark_gray;
  display: none;
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
