<template>
  <CollapseItem v-if="info.length" tab-id="3">
    <template #inside-title>
      <div class="title-in">Информация об отделении</div>
    </template>
    <template #inside-content>
      <div class="example" v-html="info" />
    </template>
  </CollapseItem>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import CollapseItem from '@/components/Main/Collapse/CollapseItem.vue';

export default defineComponent({
  name: 'DivisionInfoBlock',
  components: { CollapseItem },
  props: {
    info: {
      type: String,
      default: '',
    },
  },
});
</script>

<style scoped lang="scss">
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

.example {
  font-size: 16px;
  color: $site_dark_gray;
  margin: 20px;
}
</style>
