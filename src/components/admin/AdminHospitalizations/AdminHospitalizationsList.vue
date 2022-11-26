<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <template #header>
      <RemoteSearch :key-value="schema.doctor.key" placeholder="Начните вводить ФИО врача" @select="selectSearch" />
      <FiltersList :models="createGenderFilterModels()" @load="loadHospitalizations" />
      <FilterMultipleSelect :filter-model="filterByDivision" :options="schema.division.options" @load="loadHospitalizations" />
    </template>
    <template #sort>
      <SortList :max-width="400" :models="sortList" :store-mode="true" @load="loadHospitalizations" />
    </template>
    <el-table :data="hospitalizations" :border="false">
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

import FilterModel from '@/classes/filters/FilterModel';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import FilterMultipleSelect from '@/components/Filters/FilterMultipleSelect.vue';
import FiltersList from '@/components/Filters/FiltersList.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList/SortList.vue';
import { DataTypes } from '@/interfaces/filters/DataTypes';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import { Operators } from '@/interfaces/filters/Operators';
import ISearchObject from '@/interfaces/ISearchObject';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import DoctorsFiltersLib from '@/services/Provider/libs/filters/DoctorsFiltersLib';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminHospitalizationsList',
  components: { AdminListWrapper, TableButtonGroup, RemoteSearch, SortList, FiltersList, FilterMultipleSelect },
  setup() {
    const hospitalizations = computed(() => Provider.store.getters['hospitalizations/items']);
    // const genderFilter: Ref<IFilterModel> = ref(new FilterModel());

    const loadHospitalizations = async () => {
      await Provider.store.dispatch('hospitalizations/getAll', Provider.filterQuery.value);
    };
    const filterByDivision: Ref<IFilterModel> = ref(new FilterModel());
    const load = async () => {
      // Provider.setSortList(...createSortModels(DoctorsSortsLib));
      // Provider.setSortModels(DoctorsSortsLib.byFullName(Orders.Asc));
      await Provider.store.dispatch('meta/getOptions', Provider.schema.value.division);
      // filterByDivision.value = DoctorsFiltersLib.byDivisions([]);
      await loadHospitalizations();
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Госпитализации',
        buttons: [{ text: 'Добавить госпитализацию', type: 'primary', action: create }],
      });
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'hospitalizations', action: 'getAll' },
      sortModels: [],
    });

    const create = () => Provider.router.push(`/admin/hospitalizations/new`);
    const edit = (id: string) => Provider.router.push(`/admin/hospitalizations/${id}`);
    const remove = async (id: string) => await Provider.store.dispatch('hospitalizations/remove', id);

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push({ name: `AdminEditDoctorPage`, params: { id: event.value } });
    };

    const createGenderFilterModels = (): IFilterModel[] => {
      return [DoctorsFiltersLib.onlyMale(), DoctorsFiltersLib.onlyFemale()];
    };

    return {
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
      createGenderFilterModels,
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
