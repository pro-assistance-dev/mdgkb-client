<template>
  <CollapseItem>
    <template #inside-title>
      <div class="title-in">Информация о курсе</div>
    </template>
    <template #inside-content>
      <div class="info">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
        in culpa qui officia deserunt mollit anim id est laborum.
      </div>
      <div class="info" v-html="info" />
    </template>
  </CollapseItem>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import CollapseItem from '@/services/components/Collapse/CollapseItem.vue';

export default defineComponent({
  name: 'ResidencyInfoBlock',
  components: { CollapseItem },
  props: {
    info: {
      type: String,
      default: '',
    },
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

.info {
  height: calc(100% - 50px);
  padding: 25px;
  font-size: 14px;
  color: #343e5c;
}
</style>
