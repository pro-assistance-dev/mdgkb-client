<template>
  <div v-if="dpoCourses.length" class="card-flex-container">
    <div v-for="dpoCourse in dpoCourses" :key="dpoCourse.id" class="card-container">
      <DpoCourseCard :dpo-course="dpoCourse" />
    </div>
  </div>
  <h1 v-else class="text-center">Нет данных</h1>
  <div v-if="dpoCourses.length" class="loadmore-button">
    <LoadMoreButton @loadMore="loadMore" />
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import DpoCourseCard from '@/components/EducationalOrganization/Dpo/DpoCourseCard.vue';
import LoadMoreButton from '@/components/LoadMoreButton.vue';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import IDpoCourse from '@/interfaces/IDpoCourse';
import ISchema from '@/interfaces/schema/ISchema';

export default defineComponent({
  name: 'DpoCoursesList',
  components: { DpoCourseCard, LoadMoreButton },
  setup() {
    const store = useStore();
    const mounted: Ref<boolean> = ref(false);
    const dpoCourses: Ref<IDpoCourse[]> = computed<IDpoCourse[]>(() => store.getters['dpoCourses/items']);

    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);

    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);

    const loadMore = async () => {
      const lastCursor = dpoCourses.value[dpoCourses.value.length - 1].name;
      filterQuery.value.pagination.setLoadMore(lastCursor, schema.value.dpoCourse.name, schema.value.dpoCourse.tableName);
      await store.dispatch('dpoBaseCourses/getAll', filterQuery.value);
    };

    return {
      dpoCourses,
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
