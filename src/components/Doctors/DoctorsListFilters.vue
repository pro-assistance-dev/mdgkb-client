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
    <template v-if="doctorsMode" #header-left-top>
      <RemoteSearch :key-value="schema.doctor.key" :max-width="300" placeholder="Начните вводить ФИО врача" @select="selectSearch" />
      <FilterSelect
        placeholder="Медицинское направление"
        :max-width="300"
        :options="schema.medicalProfile.options"
        :table="schema.doctor.tableName"
        :col="schema.doctor.medicalProfileId"
        :data-type="DataTypes.String"
        :operator="Operators.Eq"
        @load="$emit('load')"
      />
      <FilterSelect
        :max-width="200"
        placeholder="Отделение"
        :options="schema.division.options"
        :table="schema.doctor.tableName"
        :col="schema.doctor.divisionId"
        :data-type="DataTypes.String"
        :operator="Operators.Eq"
        @load="$emit('load')"
      />
    </template>
    <template v-if="doctorsMode" #header-left-bottom>
      <FilterCheckbox
        label='Обладатели статуса "Московский врач"'
        :table="schema.doctor.tableName"
        :col="schema.doctor.mosDoctorLink"
        :data-type="DataTypes.Boolean"
        :operator="Operators.NotNull"
        @load="$emit('load')"
      />
      <FilterCheckbox
        label="С отзывами"
        :table="schema.doctor.tableName"
        :col="schema.doctor.commentsCount"
        :data-type="DataTypes.Number"
        :operator="Operators.Gt"
        @load="$emit('load')"
      />
      <FilterCheckbox
        label="Избранное"
        :table="schema.doctor.tableName"
        :col="schema.doctor.id"
        :data-type="DataTypes.Join"
        :operator="Operators.Eq"
        :join-table="schema.doctorUser.tableName"
        :join-table-fk="schema.doctorUser.doctorId"
        :join-table-pk="schema.doctor.id"
        :join-table-id="TokenService.getUserId()"
        :join-table-id-col="schema.doctorUser.userId"
        @load="$emit('load')"
      />
    </template>

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
import FilterCheckbox from '@/components/Filters/FilterCheckbox.vue';
import FilterSelect from '@/components/Filters/FilterSelect.vue';
import FiltersWrapper from '@/components/Filters/FiltersWrapper.vue';
import ModeButtons from '@/components/ModeButtons.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList/SortList.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Operators } from '@/interfaces/filters/Operators';
import ISearchObject from '@/services/interfaces/ISearchObject';
import { Orders } from '@/services/interfaces/Orders';
import DoctorsSortsLib from '@/services/Provider/libs/sorts/DoctorsSortsLib';
import Provider from '@/services/Provider/Provider';
import TokenService from '@/services/Token';

export default defineComponent({
  name: 'DoctorsListFilters',
  components: {
    FilterSelect,
    FilterCheckbox,
    SortList,
    RemoteSearch,
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

    const loadFilters = async () => {
      await Provider.store.dispatch('meta/getOptions', Provider.schema.value.medicalProfile);
      await Provider.store.dispatch('meta/getOptions', Provider.schema.value.division);
    };

    const createSortModels = (): ISortModel[] => {
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
      schema: Provider.schema,
      doctors,
      doctorsMode,
    };
  },
});
</script>
