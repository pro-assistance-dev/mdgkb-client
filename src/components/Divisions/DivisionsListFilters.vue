<template>
  <FiltersWrapper>
    <template #header-right>
      <ModeChoice path="divisions" :modes="modes" @selectMode="selectMode" />
    </template>
    <template #header-left-top>
    </template>

    <template #header-left-bottom>
      <FilterCheckbox :filter-model="hospitalizationFilter" @load="$emit('load')" />
      <FilterCheckbox :filter-model="withCommentsFilter" @load="$emit('load')" />
      <FilterCheckbox :filter-model="withAmbulatoryFilter" @load="$emit('load')" />
      <FilterCheckbox :filter-model="withDiagnosticFilter" @load="$emit('load')" />
    </template>
    <template #footer>
      <SortList :models="sortList" @load="$emit('load')" />
    </template>
  </FiltersWrapper>
</template>

<script lang="ts" setup>
import TreatDirection from '@/classes/TreatDirection';
import FilterCheckbox from '@/services/components/FilterCheckbox.vue';
import FilterSelect from '@/components/Filters/FilterSelect.vue';
import FiltersWrapper from '@/components/Filters/FiltersWrapper.vue';
import ModeChoice from '@/components/ModeChoice.vue';
import { DataTypes } from '@/services/interfaces/DataTypes';
import ISearchObject from '@/services/interfaces/ISearchObject';
import { Operators } from '@/services/interfaces/Operators';
import DivisionsFiltersLib from '@/libs/filters/DivisionsFiltersLib';
import Provider from '@/services/Provider/Provider';

const props = defineProps({
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
})
const emits = defineEmits(['selectMode', 'load'])
const treatDirections: Ref<TreatDirection[]> = computed<TreatDirection[]>(() => Provider.store.getters['treatDirections/items']);
const selectSearch = async (event: ISearchObject): Promise<void> => {
  await Provider.router.push(`/divisions/${event.value}`);
};

const selectMode = async (value: string) => {
  emits('selectMode', value);
};


const hospitalizationFilter = DivisionsFiltersLib.withHospitalization().toRef()
const withCommentsFilter = DivisionsFiltersLib.withComments().toRef()
const withAmbulatoryFilter = DivisionsFiltersLib.withAmbulatory().toRef()
const withDiagnosticFilter = DivisionsFiltersLib.withDiagnostic().toRef()
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
</style>
