<template>
  <div class="event-card-container">
    <div class="event-card-container-title">
      <span>{{ item.dateStart }}</span>
      <span v-if="item.dateEnd"> - {{ item.dateEnd }}</span>
    </div>
    <div class="event-card-container-time">{{ item.time }}</div>
    <div v-if="item.content" class="event-card-container-content">{{ item.content }}</div>
    <a href="">{{ item.linkText }}</a>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IEventTemplate from '@/interfaces/IEventTemplate';

export default defineComponent({
  name: 'MainEventCard',
  props: {
    item: {
      type: Object as PropType<IEventTemplate>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.event-card-container {
  display: flex;
  flex-direction: column;
  width: 165px;
  letter-spacing: 1px;
  &-title {
    font-weight: bold;
  }
  &-title,
  &-time {
    font-size: 14px;
  }
  &-time {
    color: #a1a7bd;
    margin: 10px 0;
  }
  &-content,
  a {
    font-size: 12px;
  }
  a {
    color: #2754eb;
    text-decoration: unset;
  }
}
</style>
