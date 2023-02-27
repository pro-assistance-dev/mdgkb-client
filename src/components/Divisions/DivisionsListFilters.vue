<template>
  <FiltersWrapper>
    <template #header-right>
      <ModeChoice path="divisions" :modes="modes" @selectMode="selectMode" />
    </template>
    <template #header-left-top>
      <RemoteSearch :key-value="schema.division.key" @select="selectSearch" />
      <FilterSelect
        placeholder="Выберите направление"
        :max-width="300"
        :options="schema.treatDirection.options"
        :table="schema.division.tableName"
        :col="schema.division.treatDirectionId"
        :data-type="DataTypes.String"
        :operator="Operators.Eq"
        @load="$emit('load')"
      />
    </template>

    <template #header-left-bottom>
      <FilterCheckboxV2 :filter-model="hospitalizationFilter" @load="$emit('load')" />
      <FilterCheckboxV2 :filter-model="withCommentsFilter" @load="$emit('load')" />
      <FilterCheckboxV2 :filter-model="withAmbulatoryFilter" @load="$emit('load')" />
      <FilterCheckboxV2 :filter-model="withDiagnosticFilter" @load="$emit('load')" />
    </template>
    <template #footer>
      <SortList :models="sortList" @load="$emit('load')" />
    </template>
  </FiltersWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, PropType, Ref } from 'vue';

import FilterCheckboxV2 from '@/components/Filters/FilterCheckboxV2.vue';
import FilterSelect from '@/components/Filters/FilterSelect.vue';
import FiltersWrapper from '@/components/Filters/FiltersWrapper.vue';
import ModeChoice from '@/components/ModeChoice.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList/SortList.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import { Operators } from '@/interfaces/filters/Operators';
import ITreatDirection from '@/interfaces/ITreatDirection';
import IOption from '@/interfaces/schema/IOption';
import ISearchObject from '@/services/interfaces/ISearchObject';
import DivisionsFiltersLib from '@/services/Provider/libs/filters/DivisionsFiltersLib';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'DivisionsListFilters',
  components: {
    RemoteSearch,
    SortList,
    ModeChoice,
    FilterSelect,
    FiltersWrapper,
    FilterCheckboxV2,
  },
  props: {
    mode: {
      type: String as PropType<string>,
      required: true,
      default: '',
    },
    modes: {
      type: Array as PropType<IOption[]>,
      required: false,
      default: () => [],
    },
  },
  emits: ['selectMode', 'load'],
  setup(props, { emit }) {
    const treatDirections: Ref<ITreatDirection[]> = computed<ITreatDirection[]>(() => Provider.store.getters['treatDirections/items']);
    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push(`/divisions/${event.value}`);
    };

    const selectMode = async (value: string) => {
      emit('selectMode', value);
    };

    onBeforeMount(async () => {
      Provider.store.commit('filter/setStoreModule', 'divisions');
      await loadFilters();
    });

    const loadFilters = async () => {
      await Provider.store.dispatch('meta/getOptions', Provider.schema.value.treatDirection);
      await Provider.store.dispatch('meta/getOptions', Provider.schema.value.division);
    };

    return {
      hospitalizationFilter: DivisionsFiltersLib.withHospitalization().toRef(),
      withCommentsFilter: DivisionsFiltersLib.withComments().toRef(),
      withAmbulatoryFilter: DivisionsFiltersLib.withAmbulatory().toRef(),
      withDiagnosticFilter: DivisionsFiltersLib.withDiagnostic().toRef(),
      selectSearch,
      selectMode,
      Operators,
      DataTypes,
      schema: Provider.schema,
      sortList: Provider.sortList,
      treatDirections,
    };
  },
});
</script>

<style scoped lang="scss"></style>
