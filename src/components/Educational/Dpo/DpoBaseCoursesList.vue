<template>
  <div v-if="dpoBaseCourses.length" class="card-flex-container">
    <div v-for="dpoCourse in dpoBaseCourses" :key="dpoCourse.id" class="card-container">
      <DpoBaseCourseCard :dpo-base-course="dpoCourse" />
    </div>
  </div>
  <h1 v-else class="text-center">Нет данных</h1>
  <div v-if="dpoBaseCourses.length" class="loadmore-button">
    <LoadMoreButton @loadMore="loadMore" />
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import DpoBaseCourseCard from '@/components/Educational/Dpo/DpoBaseCourseCard.vue';
import LoadMoreButton from '@/components/LoadMoreButton.vue';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IDpoBaseCourse from '@/interfaces/IDpoBaseCourse';
import ISchema from '@/interfaces/schema/ISchema';

export default defineComponent({
  name: 'DpoBaseCoursesList',
  components: { DpoBaseCourseCard, LoadMoreButton },
  setup() {
    const store = useStore();
    const mounted: Ref<boolean> = ref(false);
    const dpoBaseCourses: Ref<IDpoBaseCourse[]> = computed<IDpoBaseCourse[]>(() => store.getters['dpoBaseCourses/items']);

    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);

    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);

    const loadMore = async () => {
      const lastCursor = dpoBaseCourses.value[dpoBaseCourses.value.length - 1].name;
      filterQuery.value.pagination.setLoadMore(lastCursor, schema.value.division.name, schema.value.division.tableName);
      await store.dispatch('dpoBaseCourses/getAll', filterQuery.value);
    };

    return {
      dpoBaseCourses,
      loadMore,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/doctor-info-card.scss';

.text-center {
  text-align: center;
  justify-content: center;
}

.card-flex-container {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}
.card-container {
  height: 350px;
  margin: 0 auto;
}

.loadmore-button {
  display: flex;
  justify-content: center;
}
</style>
