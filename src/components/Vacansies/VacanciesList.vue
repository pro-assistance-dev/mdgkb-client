<template>
  <div v-if="mounted" class="vacansies-container">
    <div class="vacansies-container-left">
      <VacanciesFilters @load="loadVacancies" />
    </div>
    <div>
      <h2>Вакансии</h2>
      <div class="vacansies-container-right">
        <VacancyCard v-for="item in vacancies" :key="item.id" :vacancy="item" />
      </div>
      <LoadMoreButton @loadMore="loadMore" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import LoadMoreButton from '@/components/LoadMoreButton.vue';
import VacanciesFilters from '@/components/Vacansies/VacanciesFilters.vue';
import VacancyCard from '@/components/Vacansies/VacancyCard.vue';
import { Operators } from '@/interfaces/filters/Operators';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import VacanciesSortsLib from '@/services/Provider/libs/sorts/VacanciesSortsLib';

export default defineComponent({
  name: 'VacanciesList',
  components: { VacanciesFilters, VacancyCard, LoadMoreButton },

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
  flex-direction: column;
  align-items: center;
  &-left {
    // position: sticky;
    // top: 79px;
    // z-index: 1;
    width: 100vw;
    // padding: 20px 0;
    // background-color: white;
    // border-top: 2px solid #f6f6f6;
    // border-bottom: 2px solid #f6f6f6;
  }
  &-right {
    // display: grid;
    // grid-template-columns: 1fr 1fr 1fr;
    // grid-gap: 5px;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width: 100%;
  }
  h2 {
    margin-top: 0;
    text-align: center;
  }
}
</style>
