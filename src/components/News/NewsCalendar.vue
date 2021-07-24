<template>
  <calendar locale="ru" :attributes="attributes">
    <template #day-popover="{ dayTitle, attributes }">
      <div style="text-align: center">
        {{ dayTitle }}
      </div>
      <popover-row v-for="attr in attributes" :key="attr.key" :attribute="attr">
        <a class="newsLabel" @click.prevent="$router.push(`/news${item.slug}`)">{{ attr.popover.label }}</a>
      </popover-row>
    </template>
  </calendar>
</template>

<script lang="ts">
import { PropType, defineComponent, computed } from 'vue';
import { Calendar, PopoverRow } from 'v-calendar';
import INews from '@/interfaces/news/INews';
export default defineComponent({
  name: 'NewsCalendar',
  props: {
    news: {
      type: Array as PropType<Array<INews>>,
      required: true,
    },
  },
  components: { Calendar, PopoverRow },

  setup(props) {
    const randomDotColor = () => {
      const colors = ['gray', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink'];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const attributes = computed(() => [
      ...props.news.map((item) => {
        return {
          dot: randomDotColor(),
          dates: [new Date(item.publishedOn)],
          popover: {
            label: item.title,
            visibility: 'focus',
            placement: 'bottom-end',
          },
          slug: item.slug,
        };
      }),
    ]);

    return {
      attributes,
    };
  },
});
</script>

<style scoped lang="scss">
:deep(.newsLabel) {
  cursor: pointer !important;
  max-width: 200px;
  word-break: break-word;
}
</style>
