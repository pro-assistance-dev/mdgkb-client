<template>
  <div
    class="body"
    :style="{
      marginTop: marginTop,
    }"
  >
    <svg class="icon-time">
      <use xlink:href="#time"></use>
    </svg>
    <div class="text">
      {{ text }}
    </div>
  </div>
  <Time />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Time from '@/assets/svg/DivisionCard/Time.svg';

export default defineComponent({
  name: 'Announcement',
  components: {
    Time,
  },
  props: {
    text: {
      type: String as PropType<string>,
      required: false,
      default: 'Внимание!',
    },
    marginTop: {
      type: String as PropType<string>,
      required: false,
      default: '30px',
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

.icon-time {
  width: 32px;
  height: 32px;
  fill: #ffffff;
}

.body {
  display: flex;
  align-items: center;
  justify-content: left;
  width: calc(100% - 32px);
  padding: 16px;
  background: #ff4e3c;
  color: #ffffff;
  border-radius: 16px;
}

.text {
  max-width: 260px;
  font-weight: bold;
  font-size: 15px;
  padding: 0;
  margin: 0 0 0 20px;
  letter-spacing: 1px;
  line-height: 1.1;
}

@media screen and (max-width: 400px) {
  .text {
    max-width: 240px;
    margin: 0 0 0 10px;
    font-size: 13px;
  }
}
</style>
