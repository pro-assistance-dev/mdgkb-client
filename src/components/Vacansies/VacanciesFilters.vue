<template>
  <div v-if="mounted" class="filters-container">
    <div class="filters-container-top">
      <div class="container">
        <RemoteSearch
          :max-width="400"
          place-holder="Начните вводить наименование вакансии"
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
      </div>
    </div>
    <div class="filters-container-bottom container">
      <SortList :max-width="400" show-label :models="sortList" @load="$emit('load')" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import FilterSelect from '@/components/Filters/FilterSelect.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList/SortList.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'VacanciesFilters',
  components: { RemoteSearch, SortList, FilterSelect },
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

<style lang="scss" scoped>
.filters-container {
  margin: 0 10px;
  &-top {
    padding: 20px 0;
    margin: 10px 0;
    background-color: white;
    border-top: 2px solid #e4e6f2;
    border-bottom: 2px solid #e4e6f2;

    .container {
      display: flex;
    }
  }
  &-bottom {
    display: flex;
    justify-content: flex-end;
  }
}

@media screen and (max-width: 480px) {
  .filters-container {
    &-top {
      .container {
        flex-direction: column;
      }
    }
  }
}
</style>
