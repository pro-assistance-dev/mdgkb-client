<template>
  <calendar ref="calendar" class="radius" locale="ru" :attributes="attributesProp" is-expanded @update:from-page="changeMonth">
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

import News from '@/classes/News';
import ICalendarMeta from '@/interfaces/news/ICalendarMeta';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import NewsFiltersLib from '@/libs/filters/NewsFiltersLib';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'NewsCalendar',
  components: { Calendar, PopoverRow },

  setup() {
    const calendar = ref();
    const news = computed(() => Provider.store.getters['news/calendarNews']);
    const calendarMeta = computed(() => Provider.store.getters['news/calendarMeta']);
    const randomDotColor = () => {
      const colors = ['gray', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink'];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const attributesProp = computed(() => [
      ...news.value.map((item: News) => {
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
      if (!page.year || !page.month) {
        return;
      }
      const fq = new FilterQuery();

      const dateFrom = new Date(page.year, page.month - 1, 1);
      const dateTo = new Date(page.year, page.month, 1);

      fq.filterModels.push(NewsFiltersLib.byPeriod(dateFrom, dateTo), NewsFiltersLib.onlyPublished());
      await Provider.store.dispatch('news/getByMonth', fq);

      const params: ICalendarMeta = { month: page.month, year: page.year };
      Provider.store.commit('news/updateCalendarMeta', params);
    };
    const loadCalendarMeta = async () => {
      if (calendarMeta.value) {
        await calendar.value.move(calendarMeta.value);
      }
    };
    onMounted(loadCalendarMeta);

    return {
      attributesProp,
      calendar,
      changeMonth,
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/calendar-style.scss';

:deep(.newsLabel) {
  cursor: pointer !important;
  max-width: 200px;
  word-break: break-word;
  text-align: start;
}

.radius.radius {
  border: rgba(0, 0, 0, 0.05) solid 1px;
  border-radius: 5px;
  background-clip: padding-box;
}
</style>
