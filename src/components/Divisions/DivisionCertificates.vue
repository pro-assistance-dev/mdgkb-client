<template>
  <CollapseItem v-if="false" tab-id="17" :collapsed="false">
    <template #inside-title>
      <div class="title-in">Сертификаты</div>
    </template>
    <template #inside-content>
      <div v-if="false" class="Date-and-time"></div>
    </template>
  </CollapseItem>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import CollapseItem from '@/components/Main/Collapse/CollapseItem.vue';

export default defineComponent({
  name: 'DivisionCertificates',
  components: { CollapseItem },
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
