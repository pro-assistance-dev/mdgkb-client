<template>
  <div v-if="teachers.length" class="card-flex-container">
    <div v-for="teacher in teachers" :key="teacher.id" class="card-container">
      <TeacherCard :teacher="teacher" />
    </div>
  </div>
  <h1 v-else class="text-center">Нет данных</h1>
  <div v-if="teachers.length" class="loadmore-button">
    <LoadMoreButton @loadMore="loadMore" />
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref } from 'vue';
import { useStore } from 'vuex';

import FilterQuery from '@/classes/filters/FilterQuery';
import Teacher from '@/classes/Teacher';
import TeacherCard from '@/components/Educational/TeachersManagers/TeacherCard.vue';
import LoadMoreButton from '@/components/LoadMoreButton.vue';
import ISchema from '@/interfaces/schema/ISchema';
export default defineComponent({
  name: 'TeachersList',
  components: { TeacherCard, LoadMoreButton },
  setup() {
    const store = useStore();
    const teachers: Ref<Teacher[]> = computed<Teacher[]>(() => store.getters['teachers/items']);

    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);

    const filterQuery: ComputedRef<FilterQuery> = computed(() => store.getters['filter/filterQuery']);

    const loadMore = async () => {
      const lastCursor = teachers.value[teachers.value.length - 1].employee.human.getFullName();
      filterQuery.value.pagination.setLoadMore(lastCursor, schema.value.teacher.fullName, schema.value.teacher.tableName);
      await store.dispatch('teachers/getAll', filterQuery.value);
    };

    return {
      teachers,
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
