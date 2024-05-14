<template>
  <PageWrapper v-if="mounted" title="Вакансии">
    <template #filters>
      <!-- <VacanciesFilters @load="loadVacancies" /> -->
    </template>
    <div class="vacansies-container">
      <VacancyCard v-for="item in vacancies" :key="item.id" :vacancy="item" />
    </div>
    <LoadMoreButton @loadMore="loadMore" />
  </PageWrapper>
</template>

<script lang="ts" setup>
import Vacancy from '@/classes/Vacancy';
import LoadMoreButton from '@/components/LoadMoreButton.vue';
import PageWrapper from '@/components/PageWrapper.vue';
import VacanciesFilters from '@/components/Vacansies/VacanciesFilters.vue';
import VacancyCard from '@/components/Vacansies/VacancyCard.vue';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import VacanciesFiltersLib from '@/libs/filters/VacanciesFiltersLib';
import VacanciesSortsLib from '@/libs/sorts/VacanciesSortsLib';
import Provider from '@/services/Provider/Provider';

const vacancies: ComputedRef<Vacancy[]> = Store.Items('vacancies')
const ftsp = FTSP.Get()
const mounted = ref(false)
const loadVacancies = async () => {
  ftsp.p.limit = 8;
  await Store.FTSP('vacancies');
};

const load = async () => {
  ftsp.setS(VacanciesSortsLib.byTitle())
  // Provider.setSortList(...createSortModels(VacanciesSortsLib));
  ftsp.setF(VacanciesFiltersLib.onlyActive());
  await loadVacancies();
  mounted.value = true
};

Hooks.onBeforeMount(load);

const loadMore = async () => {
  ftsp.p.append = true;
  ftsp.p.offset = vacancies.value.length;
  await Store.FTSP('vacancies');
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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
