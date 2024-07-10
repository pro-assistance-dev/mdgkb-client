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

import EducationalManager from '@/classes/EducationalManager';
import EducationalManagerCard from '@/components/Educational/TeachersManagers/EducationalManagerCard.vue';
import LoadMoreButton from '@/components/LoadMoreButton.vue';
import FilterQuery from '@/services/classes/filters/FilterQuery';

export default defineComponent({
  name: 'EducationalManagersList',
  components: { EducationalManagerCard, LoadMoreButton },
  setup() {
    const educationalManagers: Ref<EducationalManager[]> = Store.Items('educationalManagers');

    onBeforeMount(async () => {
      filterQuery.value.pagination.cursorMode = false;
      filterQuery.value.pagination.limit = 6;
      await Store.Dispatch('educationalManagers/getAll', { filterQuery: filterQuery.value });
    });

    const loadMore = async () => {
      // const lastCursor = managers.value[managers.value.length - 1].name;
      await Store.Dispatch('educationalManagers/getAll', { filterQuery: filterQuery.value });
    };

    return {
      educationalManagers,
      loadMore,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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
