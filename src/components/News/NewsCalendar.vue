<template>
  <calendar ref="calendar" locale="ru" :attributes="attributes" is-expanded @update:from-page="changeMonth">
    <template #day-popover="{ dayTitle, attributes }">
      <div style="text-align: center">
        {{ dayTitle }}
      </div>
      <popover-row v-for="attr in attributes" :key="attr.key" :attribute="attr">
        <div class="newsLabel" @click.prevent="$router.push(`/news/${attr.popover.slug}`)">{{ attr.popover.label }}</div>
      </popover-row>
    </template>
  </calendar>
</template>

<script lang="ts">
import { Calendar, PopoverRow } from 'v-calendar';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

import ICalendarMeta from '@/interfaces/news/ICalendarMeta';
import INews from '@/interfaces/news/INews';

export default defineComponent({
  name: 'NewsCalendar',
  components: { Calendar, PopoverRow },

  setup() {
    const store = useStore();
    const calendar = ref();
    const news = computed(() => store.getters['news/calendarNews']);
    const calendarMeta = computed(() => store.getters['news/calendarMeta']);
    const randomDotColor = () => {
      const colors = ['gray', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink'];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const attributes = computed(() => [
      ...news.value.map((item: INews) => {
        return {
          dot: randomDotColor(),
          dates: [new Date(item.publishedOn)],
          popover: {
            label: item.title,
            slug: item.slug,
            visibility: 'focus',
            placement: 'bottom-end',
            isInteractive: true,
          },
        };
      }),
    ]);
    const changeMonth = async (page: ICalendarMeta): Promise<void> => {
      const params: ICalendarMeta = { month: page.month, year: page.year };
      await store.dispatch('news/getByMonth', params);
    };
    const loadCalendarMeta = async () => {
      if (calendarMeta.value) {
        await calendar.value.move(calendarMeta.value);
      }
    };
    onMounted(loadCalendarMeta);

    return {
      attributes,
      calendar,
      changeMonth,
    };
  },
});
</script>

<style scoped lang="scss">
:deep(.newsLabel) {
  cursor: pointer !important;
  max-width: 200px;
  word-break: break-word;
  text-align: start;
}
</style>
