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
import VacancyResponsesSortsLib from '@/libs/sorts/VacancyResponsesSortsLib';
import Hooks from '@/services/Hooks/Hooks';
import { Orders } from '@/services/interfaces/Orders';

const vacancyResponses: VacancyResponse[] = VacancyResponsesStore.Items();
// const applicationsCount: ComputedRef<number> =  computed(() => Provider.store.getters['admin/applicationsCount']('vacancy_responses'));

const loadResponses = async () => {
  VacancyResponsesStore.ResetItem();
  await Store.FTSP('vacancyResponses');
};

const load = async () => {
  FTSP.Get().setS(VacancyResponsesSortsLib.byDate(Orders.Desc));
  // Provider.setSortList(...createSortModels(VacancyResponsesSortsLib));
  await VacancyResponsesStore.FTSP();
  PHelp.AdminUI.Head.Set('Отклики на вакансии', []);
};

// const create = () => Provider.router.push(`/admin/vacancy-responses/new`);
const remove = async (index: string) => await VacancyResponsesStore.Remove(index);

Hooks.onBeforeMount(load);
</script>
