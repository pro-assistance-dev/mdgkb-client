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
import { computed, defineComponent } from 'vue';

import LoadMoreButton from '@/components/LoadMoreButton.vue';
import PageWrapper from '@/components/PageWrapper.vue';
import VacanciesFilters from '@/components/Vacansies/VacanciesFilters.vue';
import VacancyCard from '@/components/Vacansies/VacancyCard.vue';
import { Operators } from '@/interfaces/filters/Operators';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import VacanciesSortsLib from '@/services/Provider/libs/sorts/VacanciesSortsLib';

export default defineComponent({
  name: 'VacanciesList',
  components: { VacanciesFilters, VacancyCard, LoadMoreButton, PageWrapper },

  setup() {
    const vacancies = computed(() => Provider.store.getters['vacancies/vacancies']);

    const loadVacancies = async () => {
      Provider.store.commit('vacancies/clearVacancies');
      await Provider.store.dispatch('vacancies/getAll', Provider.filterQuery.value);
    };

    const load = async () => {
      Provider.resetFilterQuery();
      Provider.filterQuery.value.pagination.limit = 8;
      Provider.filterQuery.value.pagination.cursorMode = true;
      Provider.setSortModels(VacanciesSortsLib.byDate());
      Provider.setSortList(...createSortModels(VacanciesSortsLib));
      // Provider.setFilterModels(VacanciesFiltersLib.onlyActive());
      await Provider.store.dispatch('meta/getOptions', Provider.schema.value.division);
      await loadVacancies();
    };

    Hooks.onBeforeMount(load);

    const loadMore = async () => {
      Provider.filterQuery.value.pagination.cursor.value = vacancies.value[vacancies.value.length - 1].date;
      Provider.filterQuery.value.pagination.cursor.operation = Operators.Lt;
      Provider.filterQuery.value.pagination.cursor.column = Provider.schema.value.vacancy.date;
      Provider.filterQuery.value.pagination.cursor.initial = false;
      Provider.filterQuery.value.pagination.cursorMode = true;

      await Provider.store.dispatch('vacancies/getAll', Provider.filterQuery.value);
    };

    return {
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
