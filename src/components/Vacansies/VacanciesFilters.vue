<template>
  <div v-if="mounted" class="left-side-container">
    <RemoteSearch :key-value="schema.vacancy.key" @select="selectSearch" />
    <FilterSelect
      placeholder="Отделение"
      :options="schema.division.options"
      :table="schema.vacancy.tableName"
      :col="schema.vacancy.divisionId"
      @load="load"
    />
    <SortList :models="createSortModels()" @load="load" />
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import SortModel from '@/classes/filters/SortModel';
import FilterSelect from '@/components/Filters/FilterSelect.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList/SortList.vue';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Orders } from '@/interfaces/filters/Orders';
import ISearchObject from '@/interfaces/ISearchObject';
import ISchema from '@/interfaces/schema/ISchema';

export default defineComponent({
  name: 'VacanciesFilters',
  components: { RemoteSearch, SortList, FilterSelect },

  setup() {
    const store = useStore();
    const router = useRouter();
    const vacancies = computed(() => store.getters['vacancies/vacancies']);
    const mounted: Ref<boolean> = ref(false);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);
    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);

    onBeforeMount(async () => {
      store.commit(`filter/resetQueryFilter`);
      await store.dispatch('meta/getSchema');
      store.commit('filter/setStoreModule', 'vacancies');
      await load();
      await loadFilters();
      mounted.value = true;
    });

    const load = async () => {
      filterQuery.value.pagination.cursorMode = false;
      // filterQuery.value.pagination.limit = 6;
      await store.dispatch('vacancies/getAll', filterQuery.value);
    };

    const loadFilters = async () => {
      await store.dispatch('meta/getOptions', schema.value.division);
    };

    const createSortModels = (): ISortModel[] => {
      return [SortModel.CreateSortModel(schema.value.vacancy.tableName, schema.value.vacancy.title, Orders.Asc, 'По алфавиту', true)];
    };

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await router.push(`/vacancies/${event.id}`);
    };

    return {
      mounted,
      load,
      createSortModels,
      selectSearch,
      schema,
      vacancies,
    };
  },
});
</script>

<style lang="scss" scoped>
.vacansies-container {
  display: flex;
  &-left {
    margin-right: 30px;
    flex-shrink: 0;
    width: 300px;
    position: sticky;
    top: 79px;
    height: 100%;
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
