<template>
  <FiltersWrapper v-if="mounted">
    <template #header-left-top>
      <RemoteSearch
        :max-width="400"
        placeholder="Начните вводить наименование вакансии"
        :key-value="schema.vacancy.key"
        @select="selectSearch"
      />
      <FilterSelect
        placeholder="Выберите отделение"
        :options="schema.division.options"
        :table="schema.vacancy.tableName"
        :col="schema.vacancy.divisionId"
        @load="$emit('load')"
      />
    </template>
    <template #footer>
      <SortList :max-width="400" show-label :models="sortList" @load="$emit('load')" />
    </template>
  </FiltersWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import FilterSelect from '@/components/Filters/FilterSelect.vue';
import FiltersWrapper from '@/components/Filters/FiltersWrapper.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList/SortList.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'VacanciesFilters',
  components: { RemoteSearch, SortList, FilterSelect, FiltersWrapper },
  emits: ['load'],

  setup() {
    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push(`/vacancies/${event.id}`);
    };

    return {
      selectSearch,
      Provider,
      sortList: Provider.sortList,
      schema: Provider.schema,
      mounted: Provider.mounted,
    };
  },
});
</script>
