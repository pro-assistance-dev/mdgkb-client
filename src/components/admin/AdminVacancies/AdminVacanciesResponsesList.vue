<template>
  <component :is="'AdminListWrapper'" v-if="mounted">
    <template #header>
      <SortList :max-width="350" :models="sortList" :store-mode="true" @load="loadResponses" />
    </template>
    <AdminVacancyResponcesTable :vacancy-responses="vacancyResponses" vacancy-column @remove="remove" />
    <template #footer>
      <Pagination />
    </template>
  </component>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue';

import AdminVacancyResponcesTable from '@/components/admin/AdminVacancies/AdminVacancyResponcesTable.vue';
import Pagination from '@/components/admin/Pagination.vue';
import SortList from '@/components/SortList/SortList.vue';
import { Orders } from '@/interfaces/filters/Orders';
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import VacancyResponsesSortsLib from '@/services/Provider/libs/sorts/VacancyResponsesSortsLib';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminVacanciesResponsesList',
  components: { Pagination, AdminListWrapper, AdminVacancyResponcesTable, SortList },

  setup() {
    const vacancyResponses: ComputedRef<IVacancyResponse[]> = computed(() => Provider.store.getters['vacancyResponses/items']);

    const loadResponses = async () => {
      Provider.store.commit('vacancyResponses/resetItems');
      await Provider.store.dispatch('vacancyResponses/getAll', Provider.filterQuery.value);
    };

    const load = async () => {
      Provider.setSortList(...createSortModels(VacancyResponsesSortsLib));
      Provider.setSortModels(VacancyResponsesSortsLib.byDate(Orders.Desc));
      await Provider.store.dispatch('vacancyResponses/getAll', Provider.filterQuery.value);
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Отклики на вакансию',
        // buttons: [{ text: 'Добавить', type: 'primary', action: create }],
      });
    };

    // const create = () => Provider.router.push(`/admin/vacancy-responses/new`);
    const remove = (index: number) => Provider.store.dispatch('vacancyResponses/remove', index);

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'vacancyResponses', action: 'getAll' },
      sortModels: [],
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
