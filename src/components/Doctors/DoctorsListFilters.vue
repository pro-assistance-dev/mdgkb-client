<template>
  <FiltersWrapper>
    <template #header-right>
      <ModeButtons
        :second-mode-active="!doctorsMode"
        :store-mode="false"
        :first-mode="'Врачи'"
        :second-mode="'Руководство'"
        @changeMode="$emit('changeMode', !doctorsMode)"
      />
    </template>
    <template v-if="doctorsMode" #header-left-top> </template>

    <template v-if="doctorsMode" #footer>
      <SortList :models="createSortModels()" @load="$emit('load')" />
    </template>
  </FiltersWrapper>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref } from 'vue';
import { useRoute } from 'vue-router';

import Doctor from '@/classes/Doctor';
import MedicalProfile from '@/classes/MedicalProfile';
import FilterCheckbox from '@/services/components/FilterCheckbox.vue';
import FiltersWrapper from '@/components/Filters/FiltersWrapper.vue';
import ModeButtons from '@/components/ModeButtons.vue';
import SortModel from '@/services/classes/SortModel';
import { DataTypes } from '@/services/interfaces/DataTypes';
import ISearchObject from '@/services/interfaces/ISearchObject';
import { Operators } from '@/services/interfaces/Operators';
import { Orders } from '@/services/interfaces/Orders';
import DoctorsSortsLib from '@/libs/sorts/DoctorsSortsLib';
import Provider from '@/services/Provider/Provider';
import TokenService from '@/services/Token';

export default defineComponent({
  name: 'DoctorsListFilters',
  components: {
    ModeButtons,
    FiltersWrapper,
  },
  emits: ['changeMode', 'load'],

  setup(_, { emit }) {
    const route = useRoute();
    const doctors: Ref<Doctor[]> = computed<Doctor[]>(() => Provider.store.getters['doctors/items']);
    const medicalProfiles: Ref<MedicalProfile[]> = computed<MedicalProfile[]>(() => Provider.store.getters['medicalProfiles/items']);
    const doctorsMode: ComputedRef<boolean> = computed(() => route.path === '/doctors');

    onBeforeMount(async () => {
      Provider.store.commit('filter/setStoreModule', 'doctors');
      await loadFilters();
    });

    const loadFilters = async () => {};

    const createSortModels = (): SortModel[] => {
      return [DoctorsSortsLib.byFullName(Orders.Asc), DoctorsSortsLib.byFullName(Orders.Desc)];
    };

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push(`/doctors/${event.value}`);
    };

    return {
      selectSearch,
      createSortModels,
      TokenService,
      Operators,
      DataTypes,
      medicalProfiles,
      doctors,
      doctorsMode,
    };
  },
});
</script>
