<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <template #header>
      <FilterSelectV2 :filter-models="createFilterAllDayModels()" placeholder="Тип пребывания" @load="loadHospitalizations" />
      <FilterSelectV2 :filter-models="createFilterConservativeModels()" placeholder="Тип лечения" @load="loadHospitalizations" />

      <FilterMultipleSelect :filter-model="filterByDivision" :options="schema.division.options" @load="loadHospitalizations" />
    </template>
    <template #sort>
      <SortList :max-width="400" :models="sortList" :store-mode="true" @load="loadHospitalizations" />
    </template>
    <el-table :data="hospitalizations" :border="false">
      <el-table-column label="Статус" width="200" class-name="sticky-left">
        <template #default="scope">
          <TableFormStatus :form="scope.row.formValue" />
        </template>
      </el-table-column>
      <el-table-column label="ФИО" sortable>
        <template #default="scope">
          {{ scope.row.formValue.user.human.getFullName() }}
        </template>
      </el-table-column>
      <el-table-column label="Дата" sortable>
        <template #default="scope">
          {{ $dateTimeFormatter.format(scope.row.date) }}
        </template>
      </el-table-column>
      <el-table-column label="Отделение" sortable>
        <template #default="scope">
          <router-link v-if="scope.row.division" :to="`/admin/divisions/${scope.row.division.id}`">{{
            scope.row.division.name
          }}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="Страхование" sortable>
        <template #default="scope">
          {{ scope.row.hospitalizationType.policyType }}
        </template>
      </el-table-column>
      <el-table-column label="Лечение" sortable>
        <template #default="scope">
          {{ scope.row.hospitalizationType.treatmentType }}
        </template>
      </el-table-column>
      <el-table-column label="Стационар" sortable>
        <template #default="scope">
          {{ scope.row.hospitalizationType.stayType }}
        </template>
      </el-table-column>
      <el-table-column width="50" align="center">
        <template #default="scope">
          <TableButtonGroup :show-edit-button="true" :show-remove-button="true" @edit="edit(scope.row.id)" @remove="remove(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
  </AdminListWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

import FilterModel from '@/services/classes/filters/FilterModel';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import FilterMultipleSelect from '@/components/Filters/FilterMultipleSelect.vue';
import FilterSelectV2 from '@/components/Filters/FilterSelectV2.vue';
import TableFormStatus from '@/components/FormConstructor/TableFormStatus.vue';
import SortList from '@/components/SortList/SortList.vue';
import { DataTypes } from '@/services/interfaces/DataTypes';
import IFilterModel from '@/services/interfaces/IFilterModel';
import { Operators } from '@/services/interfaces/Operators';
import { StayTypes } from '@/interfaces/StayTypes';
import { TreatmentTypes } from '@/interfaces/TreatmentTypes';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import ISearchObject from '@/services/interfaces/ISearchObject';
import { Orders } from '@/services/interfaces/Orders';
import HospitalizationsFiltersLib from '@/services/Provider/libs/filters/HospitalizationsFiltersLib';
import HospitalizationsSortsLib from '@/services/Provider/libs/sorts/HospitalizationsSortsLib';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminHospitalizationsList',
  components: {
    AdminListWrapper,
    TableButtonGroup,
    SortList,
    FilterMultipleSelect,
    FilterSelectV2,
    TableFormStatus,
  },
  setup() {
    const hospitalizations = computed(() => Provider.store.getters['hospitalizations/items']);
    const filterByDivision: Ref<IFilterModel> = ref(new FilterModel());

    const loadHospitalizations = async () => {
      await Provider.store.dispatch('hospitalizations/getAll', Provider.filterQuery.value);
    };

    const load = async () => {
      Provider.setSortList(...createSortModels(HospitalizationsSortsLib));
      Provider.setSortModels(HospitalizationsSortsLib.byCreatedAt(Orders.Asc));
      await Provider.store.dispatch('meta/getOptions', Provider.schema.value.division);
      filterByDivision.value = HospitalizationsFiltersLib.byDivisions([]);
      await Provider.store.dispatch('meta/getOptions', Provider.schema.value.division);
      await loadHospitalizations();
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Госпитализации',
        buttons: [{ text: 'Добавить госпитализацию', type: 'primary', action: create }],
      });
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'hospitalizations', action: 'getAll' },
    });

    const create = () => Provider.router.push(`/admin/hospitalizations/new`);
    const edit = (id: string) => Provider.router.push(`/admin/hospitalizations/${id}`);
    const remove = async (id: string) => await Provider.store.dispatch('hospitalizations/remove', id);

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push({ name: `AdminEditDoctorPage`, params: { id: event.value } });
    };

    const createFilterConservativeModels = (): IFilterModel[] => {
      return [
        HospitalizationsFiltersLib.onlyConservative(TreatmentTypes.Conservative),
        HospitalizationsFiltersLib.onlyConservative(TreatmentTypes.Operative),
      ];
    };

    const createFilterAllDayModels = (): IFilterModel[] => {
      return [HospitalizationsFiltersLib.onlyAllDay(StayTypes.AllDay), HospitalizationsFiltersLib.onlyAllDay(StayTypes.ShortDay)];
    };

    return {
      createFilterAllDayModels,
      createFilterConservativeModels,
      filterByDivision,
      hospitalizations,
      remove,
      edit,
      create,
      mounted: Provider.mounted,
      schema: Provider.schema,
      selectSearch,
      // genderFilter,
      loadHospitalizations,
      sortList: Provider.sortList,
      DataTypes,
      Operators,
    };
  },
});
</script>

<style lang="scss" scoped>
$margin: 20px 0;

.flex-column {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: $margin;
}

.flex-row-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: $margin;
}

.tag-link {
  margin: 2px;
  transition: all 0.2s;
  color: blue;
  border-color: blue;
  border-radius: 20px;
  &:hover {
    background-color: blue;
    color: white;
    cursor: pointer;
  }
}
</style>
