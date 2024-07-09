<template>
  <FiltersWrapper>
    <template #header-right>
      <!-- <ModeChoice :modes="modes" :mode="mode" @select-mode="selectMode" /> -->
    </template>
    <template #header-left-top> </template>

    <template #header-left-bottom>
      <FilterCheckbox :filter-model="hospitalizationFilter" @load="$emit('load')" />
      <FilterCheckbox :filter-model="withCommentsFilter" @load="$emit('load')" />
      <FilterCheckbox :filter-model="withAmbulatoryFilter" @load="$emit('load')" />
      <FilterCheckbox :filter-model="withDiagnosticFilter" @load="$emit('load')" />
    </template>
    <template #footer>
      <SortSelect @load="$emit('load')" />
    </template>
  </FiltersWrapper>
</template>

<script lang="ts" setup>
import DivisionsFiltersLib from '@/libs/filters/DivisionsFiltersLib';
import LabelValue from '@/services/classes/LabelValue';
import ISearchObject from '@/services/interfaces/ISearchObject';
import Provider from '@/services/Provider/Provider';

defineProps({
  mode: {
    type: LabelValue as PropType<LabelValue>,
    required: true,
    default: '',
  },
  modes: {
    type: Array as PropType<LabelValue[]>,
    required: false,
    default: () => [],
  },
});

const emits = defineEmits(['selectMode', 'load']);
// const treatDirections: Ref<TreatDirection[]> = computed<TreatDirection[]>(() => Provider.store.getters['treatDirections/items']);

const selectSearch = async (event: ISearchObject): Promise<void> => {
  await Provider.router.push(`/divisions/${event.value}`);
};

const selectMode = async (value: string) => {
  emits('selectMode', value);
};

const hospitalizationFilter = DivisionsFiltersLib.withHospitalization().toRef();
const withCommentsFilter = DivisionsFiltersLib.withComments().toRef();
const withAmbulatoryFilter = DivisionsFiltersLib.withAmbulatory().toRef();
const withDiagnosticFilter = DivisionsFiltersLib.withDiagnostic().toRef();
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
</style>
