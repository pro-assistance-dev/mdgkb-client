<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <template #header>
      <RemoteSearch :key-value="schema.doctor.key" placeholder="Начните вводить ФИО врача" @select="selectSearch" />
      <FiltersList :models="createGenderFilterModels()" @load="loadDoctors" />
      <FilterMultipleSelect :filter-model="filterByDivision" :options="schema.division.options" @load="loadDoctors" />
      <!--      <FilterSelect-->
      <!--        placeholder="Отделение"-->
      <!--        :options="schema.division.options"-->
      <!--        :table="schema.doctor.tableName"-->
      <!--        :col="schema.doctor.divisionId"-->
      <!--        :operator="Operators.Eq"-->
      <!--        :data-type="DataTypes.String"-->
      <!--        @load="loadDoctors"-->
      <!--      />-->
    </template>
    <template #sort>
      <SortList :max-width="400" :models="sortList" :store-mode="true" @load="loadDoctors" />
    </template>
    <el-table :data="doctors" :border="false">
      <el-table-column label="ФИО" sortable>
        <template #default="scope">
          {{ scope.row.human.getFullName() }}
        </template>
      </el-table-column>
      <el-table-column label="Пол" align="center" sortable>
        <template #default="scope">
          {{ scope.row.human.getGender() }}
        </template>
      </el-table-column>
      <el-table-column label="Дата рождения" sortable>
        <template #default="scope">
          {{ $dateTimeFormatter.format(scope.row.human.dateBirth) }}
        </template>
      </el-table-column>
      <el-table-column label="Отделение" sortable>
        <template #default="scope">
          <div v-for="doctorDivision in scope.row.doctorsDivisions" :key="doctorDivision.id">
            <router-link v-if="doctorDivision.division.name" :to="`/admin/divisions/${doctorDivision.division.id}`">{{
              doctorDivision.division.name
            }}</router-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="50" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup
            :show-edit-button="true"
            :show-remove-button="true"
            @edit="edit(scope.row.human.slug)"
            @remove="remove(scope.row.id)"
          />
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
import { Orders } from '@/interfaces/filters/Orders';
import ISearchObject from '@/interfaces/ISearchObject';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import DoctorsFiltersLib from '@/services/Provider/libs/filters/DoctorsFiltersLib';
import DoctorsSortsLib from '@/services/Provider/libs/sorts/DoctorsSortsLib';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminDoctorsList',
  components: { AdminListWrapper, TableButtonGroup, RemoteSearch, SortList, FiltersList, FilterMultipleSelect },
  setup() {
    const doctors = computed(() => Provider.store.getters['doctors/items']);
    const genderFilter: Ref<IFilterModel> = ref(new FilterModel());

    const loadDoctors = async () => {
      await Provider.store.dispatch('doctors/getAllAdmin', Provider.filterQuery.value);
    };
    const filterByDivision: Ref<IFilterModel> = ref(new FilterModel());
    const load = async () => {
      Provider.setSortList(...createSortModels(DoctorsSortsLib));
      Provider.setSortModels(DoctorsSortsLib.byFullName(Orders.Asc));
      await Provider.store.dispatch('meta/getOptions', Provider.schema.value.division);
      filterByDivision.value = DoctorsFiltersLib.byDivisions([]);
      await loadDoctors();
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Врачи',
        buttons: [{ text: 'Добавить врача', type: 'primary', action: create }],
      });
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'doctors', action: 'getAllAdmin' },
      sortModels: [],
    });

    const create = () => Provider.router.push(`/admin/doctors/new`);
    const edit = (slug: string) => Provider.router.push(`/admin/doctors/${slug}`);
    const remove = async (id: string) => await Provider.store.dispatch('doctors/remove', id);
    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push({ name: `AdminEditDoctorPage`, params: { id: event.value } });
    };

    const createGenderFilterModels = (): IFilterModel[] => {
      return [DoctorsFiltersLib.onlyMale(), DoctorsFiltersLib.onlyFemale()];
    };

    return {
      filterByDivision,
      doctors,
      remove,
      edit,
      create,
      mounted: Provider.mounted,
      schema: Provider.schema,
      selectSearch,
      genderFilter,
      loadDoctors,
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
