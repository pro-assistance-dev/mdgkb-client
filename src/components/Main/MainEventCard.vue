<template>
  <div class="event-card-container">
    <div class="event-card-container-title">
      <span>{{ formatDate(item.startDate) }}</span>
      <span v-if="formatDate(item.startDate)"> - {{ formatDate(item.endDate) }}</span>
    </div>
    <div class="event-card-container-time">{{ formatTime(item.startDate) }}</div>
    <div v-if="item.news.content" class="event-card-container-content">{{ item.news.getStrippedContent().substring(0, 40) }}</div>
    <a @click="$router.push(`/news/${item.news.slug}`)">{{ item.news.title }}</a>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Event from '@/classes/Event';

export default defineComponent({
  name: 'MainEventCard',
  props: {
    item: {
      type: Object as PropType<Event>,
      required: true,
    },
  },
  setup(props) {
    const formatDate = (date: Date): string => {
      const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
      return Intl.DateTimeFormat('ru-RU', options).format(new Date(date));
    };

    const formatTime = (date: Date): string => {
      const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };
      return Intl.DateTimeFormat('ru-RU', options).format(new Date(date));
    };

    return {
      formatDate,
      formatTime,
    };
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

  &-content {
    overflow: hidden;
  }

  &-content,
  a {
    font-size: 12px;
    overflow: hidden;
  }
  a {
    color: #2754eb;
    text-decoration: unset;
    &:hover {
      cursor: pointer;
      color: darken(#2754eb, 10%);
    }
  }

  a:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 10px;
    background: linear-gradient(180deg, transparent, white 50%);
  }
}
</style>
