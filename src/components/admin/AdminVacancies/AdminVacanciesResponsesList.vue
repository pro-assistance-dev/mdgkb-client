<template>
  <AdminListWrapper v-if="mounted">
    <template #sort>
      <SortList :max-width="400" :models="sortList" :store-mode="true" @load="loadResponses" />
    </template>
    <AdminVacancyResponsesTable :vacancy-responses="vacancyResponses" vacancy-column @remove="remove" />
    <template #footer>
      <Pagination />
    </template>
  </AdminListWrapper>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue';

import VacancyResponse from '@/classes/VacancyResponse';
import AdminVacancyResponsesTable from '@/components/admin/AdminVacancies/AdminVacancyResponsesTable.vue';
import SortList from '@/components/SortList/SortList.vue';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import { Orders } from '@/services/interfaces/Orders';
import VacancyResponsesSortsLib from '@/services/Provider/libs/sorts/VacancyResponsesSortsLib';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminVacanciesResponsesList',
  components: { AdminListWrapper, AdminVacancyResponsesTable, SortList },

  setup() {
    const vacancyResponses: ComputedRef<VacancyResponse[]> = computed(() => Provider.store.getters['vacancyResponses/items']);
    const applicationsCount: ComputedRef<number> = computed(() => Provider.store.getters['admin/applicationsCount']('vacancy_responses'));

    const loadResponses = async () => {
      Provider.store.commit('vacancyResponses/resetItems');
      await Provider.store.dispatch('vacancyResponses/getAll', Provider.filterQuery.value);
    };

    const load = async () => {
      Provider.setSortList(...createSortModels(VacancyResponsesSortsLib));
      Provider.setSortModels(VacancyResponsesSortsLib.byDate(Orders.Desc));
      await Provider.store.dispatch('vacancyResponses/getAll', Provider.filterQuery.value);
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Отклики на вакансии',
        // buttons: [{ text: 'Добавить', type: 'primary', action: create }],
        applicationsCount,
      });
    };

    // const create = () => Provider.router.push(`/admin/vacancy-responses/new`);
    const remove = (index: number) => Provider.store.dispatch('vacancyResponses/remove', index);

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'vacancyResponses', action: 'getAll' },
    });

    return {
      vacancyResponses,
      remove,
      mounted: Provider.mounted,
      sortList: Provider.sortList,
      loadResponses,
    };
  },
});
</script>
