<template>
  <svg width="16" height="16" class="BaseIcon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" v-html="path"></svg>
</template>

<script>
import icons from '@/icons.js';
export default {
  props: ['name'],
  data() {
    return {
      path: icons[this.name],
    };
  },
};
</script>

<style scoped lang="scss">
* {
  padding: 0;
  margin: 0;
}
.BaseIcon {
  fill: #000000;
  cursor: pointer;
}
.BaseIcon:hover {
  fill: #2dc2cc;
}
</style>
