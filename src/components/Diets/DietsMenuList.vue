<template>
  <div v-if="selectedDiet.timetable.timetableDays[0]" class="diets-container">
    {{ selectedDiet.name }}
    <div v-for="scheduleItem in selectedDiet.timetable.timetableDays[0].scheduleItems" :key="scheduleItem.id">
      <div>{{ scheduleItem.name }}</div>
      <div v-for="dish in scheduleItem.dishes" :key="dish.id">{{ dish.name }}</div>
    </div>
    таблица меню
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref } from 'vue';

import IDiet from '@/interfaces/IDiet';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'DietsMenuList',

  setup() {
    const diets: Ref<IDiet[]> = computed<IDiet[]>(() => Provider.store.getters['diets/items']);
    const selectedDiet: Ref<IDiet> = computed(() => Provider.store.getters['diets/item']);
    const isAuth = computed(() => Provider.store.getters['auth/isAuth']);

    // const openLoginModal = () => {
    //   if (!isAuth.value) {
    //     Provider.store.commit('auth/openModal', true);
    //   }
    // };

    const loadDiets = async () => {
      // Provider.filterQuery.value.allLoaded = false;
      // Provider.store.commit('diets/clearDiets');
      await Provider.getAll('diets');
    };

    const load = async () => {
      Provider.resetFilterQuery();
      // Provider.filterQuery.value.pagination.limit = 6;
      // Provider.setSortModels(CommentsSortsLib.byPublishedOn());
      await loadDiets();
    };

    Hooks.onBeforeMount(load);

    return {
      selectedDiet,
      diets,
      isAuth,
      mounted: Provider.mounted,
    };
  },
});
</script>

<style scoped lang="scss"></style>
