<template>
  <AdminListWrapper>
    <template #sort>
      <SortList :max-width="400" :models="sortList" :store-mode="true" @load="loadResponses" />
    </template>
    <AdminVacancyResponsesTable :vacancy-responses="vacancyResponses" vacancy-column @remove="remove" />
    <template #footer>
      <Pagination />
    </template>
  </AdminListWrapper>
</template>

<script lang="ts" setup>
import VacancyResponse from '@/classes/VacancyResponse';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import { Orders } from '@/services/interfaces/Orders';
import VacancyResponsesSortsLib from '@/libs/sorts/VacancyResponsesSortsLib';
import Provider from '@/services/Provider/Provider';

const vacancyResponses: ComputedRef<VacancyResponse[]> = Store.Items('vacancyResponses')
// const applicationsCount: ComputedRef<number> =  computed(() => Provider.store.getters['admin/applicationsCount']('vacancy_responses'));

const loadResponses = async () => {
  Store.Commit('vacancyResponses/resetItems');
  await Store.FTSP('vacancyResponses');
};

const load = async () => {
  FTSP.Get().setS(VacancyResponsesSortsLib.byDate(Orders.Desc))
  // Provider.setSortList(...createSortModels(VacancyResponsesSortsLib));
  await Store.FTSP('vacancyResponses');
  Provider.store.commit('admin/setHeaderParams', {
    title: 'Отклики на вакансии',
    // buttons: [{ text: 'Добавить', type: 'primary', action: create }],
    // applicationsCount,
  });
};

// const create = () => Provider.router.push(`/admin/vacancy-responses/new`);
const remove = async (index: number) => await Store.Delete('vacancyResponses', index);

Hooks.onBeforeMount(load, {
  pagination: { storeModule: 'vacancyResponses', action: 'ftsp' },
});
</script>
