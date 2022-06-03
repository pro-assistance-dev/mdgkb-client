<template>
  <FiltersWrapper v-if="mount">
    <template #header-right>
      <ModeButtons
        :second-mode-active="!doctorsMode"
        :store-mode="false"
        :first-mode="'Врачи'"
        :second-mode="'Руководство'"
        @changeMode="changeMode"
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
        @load="load"
      />
      <FilterSelect
        :max-width="200"
        placeholder="Отделение"
        :options="schema.division.options"
        :table="schema.doctor.tableName"
        :col="schema.doctor.divisionId"
        @load="load"
      />
    </template>
    <template v-if="doctorsMode" #header-left-bottom>
      <FilterCheckbox
        label='Обладатели статуса "Московский врач"'
        :table="schema.doctor.tableName"
        :col="schema.doctor.mosDoctorLink"
        :data-type="DataTypes.Boolean"
        :operator="Operators.NotNull"
        @load="load"
      />
      <FilterCheckbox
        label="С отзывами"
        :table="schema.doctor.tableName"
        :col="schema.doctor.commentsCount"
        :data-type="DataTypes.Number"
        :operator="Operators.Gt"
        @load="load"
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
        @load="load"
      />
    </template>

    <template v-if="doctorsMode" #footer>
      <SortList :models="createSortModels()" @load="load" />
    </template>
  </FiltersWrapper>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import SortModel from '@/classes/filters/SortModel';
import FilterCheckbox from '@/components/Filters/FilterCheckbox.vue';
import FilterSelect from '@/components/Filters/FilterSelect.vue';
import FiltersWrapper from '@/components/Filters/FiltersWrapper.vue';
import ModeButtons from '@/components/ModeButtons.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList/SortList.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterQuery from '@/interfaces/filters/IFilterQuery';
import ISortModel from '@/interfaces/filters/ISortModel';
import { Operators } from '@/interfaces/filters/Operators';
import { Orders } from '@/interfaces/filters/Orders';
import IDoctor from '@/interfaces/IDoctor';
import IMedicalProfile from '@/interfaces/IMedicalProfile';
import ISearchObject from '@/interfaces/ISearchObject';
import ISchema from '@/interfaces/schema/ISchema';
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

  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const doctors: Ref<IDoctor[]> = computed<IDoctor[]>(() => store.getters['doctors/items']);
    const medicalProfiles: Ref<IMedicalProfile[]> = computed<IMedicalProfile[]>(() => store.getters['medicalProfiles/items']);
    const mount = ref(false);
    const doctorsMode: ComputedRef<boolean> = computed(() => route.path === '/doctors');

    const filterQuery: ComputedRef<IFilterQuery> = computed(() => store.getters['filter/filterQuery']);
    const schema: Ref<ISchema> = computed(() => store.getters['meta/schema']);

    onBeforeMount(async () => {
      store.commit(`filter/resetQueryFilter`);
      await store.dispatch('meta/getSchema');
      store.commit('filter/setStoreModule', 'doctors');
      await load();
      await loadFilters();
      mount.value = true;
    });

    const changeMode = async (doctorsModeActive: boolean) => {
      store.commit('admin/showLoading');
      if (doctorsModeActive) {
        await router.replace('/doctors');
      } else {
        await router.replace('/heads');
      }
      store.commit('admin/closeLoading');
    };

    const load = async () => {
      filterQuery.value.pagination.cursorMode = false;
      filterQuery.value.pagination.limit = 8;
      await store.dispatch('doctors/getAll', filterQuery.value);
    };

    const loadFilters = async () => {
      await store.dispatch('meta/getOptions', schema.value.medicalProfile);
      await store.dispatch('meta/getOptions', schema.value.division);
    };

    const createSortModels = (): ISortModel[] => {
      return [
        SortModel.CreateSortModel(schema.value.doctor.tableName, schema.value.doctor.fullName, Orders.Asc, 'По алфавиту', true),
        SortModel.CreateSortModel(schema.value.doctor.tableName, schema.value.doctor.commentsCount, Orders.Desc, 'По отзывам', false),
      ];
    };

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await router.push(`/doctors/${event.value}`);
    };

    return {
      selectSearch,
      createSortModels,
      TokenService,
      Operators,
      DataTypes,
      load,
      medicalProfiles,
      schema,
      doctors,
      doctorsMode,
      mount,
      changeMode,
    };
  },
});
</script>
