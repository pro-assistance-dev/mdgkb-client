<template>
  <FiltersWrapper>
    <template #header-right>
      <ModeChoice path="divisions" :modes="modes" @selectMode="selectMode" />
    </template>
    <template #header-left-top>
      <RemoteSearch :key-value="schema.division.key" @select="selectSearch" />

      <FilterSelect
        placeholder="Выберите направление"
        :options="schema.treatDirection.options"
        :table="schema.division.tableName"
        :col="schema.division.treatDirectionId"
        :data-type="DataTypes.String"
        :operator="Operators.Eq"
        @load="$emit('load')"
      />
    </template>

    <template #header-left-bottom>
      <FilterCheckbox
        label="С возможностью госпитализации"
        :table="schema.division.tableName"
        :col="schema.division.hospitalizationContactInfoId"
        :data-type="DataTypes.String"
        :operator="Operators.NotNull"
        @load="$emit('load')"
      />

      <FilterCheckbox
        label="С отзывами"
        :table="schema.division.tableName"
        :col="schema.division.commentsCount"
        :data-type="DataTypes.Number"
        :operator="Operators.Gt"
        @load="$emit('load')"
      />
    </template>
    <template #footer>
      <SortList :models="sortList" @load="$emit('load')" />
    </template>
  </FiltersWrapper>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import FilterCheckbox from '@/components/Filters/FilterCheckbox.vue';
import FilterSelect from '@/components/Filters/FilterSelect.vue';
import FiltersWrapper from '@/components/Filters/FiltersWrapper.vue';
import ModeChoice from '@/components/ModeChoice.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList/SortList.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import { Operators } from '@/interfaces/filters/Operators';
import ISearchObject from '@/interfaces/ISearchObject';
import IOption from '@/interfaces/schema/IOption';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'DivisionsListFilters',
  components: {
    FilterCheckbox,
    RemoteSearch,
    SortList,
    ModeChoice,
    FilterSelect,
    FiltersWrapper,
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
    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push(`/divisions/${event.value}`);
    };

    const selectMode = async (value: string) => {
      emit('selectMode', value);
    };

    return {
      selectSearch,
      selectMode,
      Operators,
      DataTypes,
      schema: Provider.schema,
      sortList: Provider.sortList,
    };
  },
});
</script>

<style scoped lang="scss"></style>
