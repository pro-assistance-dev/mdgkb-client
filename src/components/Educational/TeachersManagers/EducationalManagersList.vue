<template>
  <div v-if="educationalManagers.length" class="card-flex-container">
    <div v-for="manager in educationalManagers" :key="manager.id" class="card-container">
      <EducationalManagerCard :educational-manager="manager" />
    </div>
  </div>
  <h1 v-else class="text-center">Нет данных</h1>
  <div v-if="educationalManagers.length" class="loadmore-button">
    <LoadMoreButton @loadMore="loadMore" />
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref } from 'vue';
import { useStore } from 'vuex';

import EducationalManager from '@/classes/EducationalManager';
import EducationalManagerCard from '@/components/Educational/TeachersManagers/EducationalManagerCard.vue';
import LoadMoreButton from '@/components/LoadMoreButton.vue';
import FilterQuery from '@/services/classes/filters/FilterQuery';

export default defineComponent({
  name: 'EducationalManagersList',
  components: { EducationalManagerCard, LoadMoreButton },
  setup() {
    const store = useStore();
    const educationalManagers: Ref<EducationalManager[]> = computed<EducationalManager[]>(() => store.getters['educationalManagers/items']);

    onBeforeMount(async () => {
      filterQuery.value.pagination.cursorMode = false;
      filterQuery.value.pagination.limit = 6;
      store.commit('filter/setStoreModule', 'educationalManagers');
      await store.dispatch('educationalManagers/getAll', filterQuery.value);
    });

    const filterQuery: ComputedRef<FilterQuery> = computed(() => store.getters['filter/filterQuery']);

    const loadMore = async () => {
      // const lastCursor = managers.value[managers.value.length - 1].name;
      // filterQuery.value.pagination.setLoadMore(lastCursor, schema.value.division.name, schema.value.division.tableName);
      await store.dispatch('educationalManagers/getAll', filterQuery.value);
    };

    return {
      educationalManagers,
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
