<template>
  <CollapseItem v-if="false" tab-id="12" :collapsed="false">
    <template #inside-title>
      <div class="title-in">Дата и время приема</div>
    </template>
    <template #inside-content>
      <div v-if="false" class="Date-and-time"></div>
    </template>
  </CollapseItem>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Doctor from '@/classes/Doctor';
import CollapseItem from '@/services/components/Collapse/CollapseItem.vue';

export default defineComponent({
  name: 'DoctorDateAndTime',
  components: { CollapseItem },
  props: {
    doctor: { type: Object as PropType<Doctor>, required: true },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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

.Date-and-time {
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
</style>
