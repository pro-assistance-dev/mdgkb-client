<template>
  <PageWrapper v-if="mounted" title="Вакансии">
    <template #filters>
      <VacanciesFilters @load="loadVacancies" />
    </template>
    <div class="vacansies-container">
      <VacancyCard v-for="item in vacancies" :key="item.id" :vacancy="item" />
    </div>
    <LoadMoreButton @loadMore="loadMore" />
  </PageWrapper>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import LoadMoreButton from '@/components/LoadMoreButton.vue';
import PageWrapper from '@/components/PageWrapper.vue';
import VacanciesFilters from '@/components/Vacansies/VacanciesFilters.vue';
import VacancyCard from '@/components/Vacansies/VacancyCard.vue';
import IVacancy from '@/interfaces/IVacancy';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import VacanciesFiltersLib from '@/services/Provider/libs/filters/VacanciesFiltersLib';
import VacanciesSortsLib from '@/services/Provider/libs/sorts/VacanciesSortsLib';

export default defineComponent({
  name: 'VacanciesList',
  components: { VacanciesFilters, VacancyCard, LoadMoreButton, PageWrapper },

  setup() {
    const vacancies: ComputedRef<IVacancy[]> = computed(() => Provider.store.getters['vacancies/items']);
    const route = useRoute();
    const router = useRouter();

    const loadVacancies = async () => {
      Provider.filterQuery.value.pagination.limit = 8;
      await Provider.store.dispatch('vacancies/getAll', Provider.filterQuery.value);
    };

    const load = async () => {
      Provider.setSortModels(VacanciesSortsLib.byTitle());
      Provider.setSortList(...createSortModels(VacanciesSortsLib));
      Provider.setFilterModel(VacanciesFiltersLib.onlyActive());
      await Provider.store.dispatch('meta/getOptions', Provider.schema.value.division);
      Provider.filterQuery.value.fromUrlQuery(route.query);
      await loadVacancies();
    };

    Hooks.onBeforeMount(load);
    watch(
      Provider.filterQuery.value,
      async () => {
        const routeQuery = await Provider.filterQuery.value.toUrlQuery();
        await router.replace(route.path + routeQuery);
        // console.log('Provider.filterQuery.value', Provider.filterQuery.value);
        // console.log('route.query', route.query);
        // console.log('route.fullPath', route.fullPath);
      },
      { deep: true }
    );

    const loadMore = async () => {
      Provider.filterQuery.value.pagination.append = true;
      Provider.filterQuery.value.pagination.offset = vacancies.value.length;
      await Provider.store.dispatch('vacancies/getAll', Provider.filterQuery.value);
    };

    return {
      load,
      vacancies,
      mounted: Provider.mounted,
      loadMore,
      loadVacancies,
    };
  },
});
</script>

<style lang="scss" scoped>
.vacansies-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
}
h2 {
  margin-top: 0;
  text-align: center;
}
</style>
