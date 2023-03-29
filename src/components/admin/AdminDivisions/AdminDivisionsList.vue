<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <template #header>
      <RemoteSearch class="filters-block" :key-value="schema.division.key" @select="selectSearch" />
      <SortList class="filters-block" :models="sortList" :store-mode="true" @load="loadDivisions" />
      <FilterSelect
        placeholder="Здание"
        :options="schema.building.options"
        :table="schema.division.tableName"
        :col="schema.division.buildingId"
        :operator="Operators.Eq"
        :data-type="DataTypes.String"
        @load="loadDivisions"
      />
    </template>
    <el-table :data="divisions">
      <el-table-column prop="name" label="Наименование" sortable> </el-table-column>
      <el-table-column prop="entrance.building.name" label="Корпус" sortable> </el-table-column>
      <el-table-column prop="address" label="Корпус" sortable> </el-table-column>
      <el-table-column prop="phone" label="Номер телефона" sortable> </el-table-column>
      <el-table-column prop="email" label="Email" sortable> </el-table-column>
      <el-table-column width="50" align="center">
        <template #default="scope">
          <el-switch v-model="scope.row.show" @change="update(scope.row)" />
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

import Division from '@/classes/Division';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import FilterSelect from '@/components/Filters/FilterSelect.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList/SortList.vue';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import { DataTypes } from '@/services/interfaces/DataTypes';
import IFilterModel from '@/services/interfaces/IFilterModel';
import ISearchObject from '@/services/interfaces/ISearchObject';
import ISortModel from '@/services/interfaces/ISortModel';
import { Operators } from '@/services/interfaces/Operators';
import DivisionsSortsLib from '@/services/Provider/libs/sorts/DivisionsSortsLib';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminDivisionsList',
  components: { TableButtonGroup, RemoteSearch, SortList, AdminListWrapper, FilterSelect },
  setup() {
    const divisions = computed(() => Provider.store.getters['divisions/items']);
    const addDivision = () => Provider.router.push(`/admin/divisions/new`);
    const sortList: Ref<ISortModel[]> = ref([]);

    const edit = async (id: string): Promise<void> => {
      const item = divisions.value.find((i: Division) => i.id === id);
      if (item) {
        await Provider.router.push(`/admin/divisions/${id}`);
      }
    };

    const remove = async (id: string) => {
      await Provider.store.dispatch('divisions/remove', id);
    };

    const loadDivisions = async (): Promise<void> => {
      await Provider.store.dispatch('divisions/getAllWithCount', Provider.filterQuery.value);
    };

    const load = async (): Promise<void> => {
      Provider.setSortModels(DivisionsSortsLib.byName());
      sortList.value = [DivisionsSortsLib.byName(), DivisionsSortsLib.byCommentsCount()];
      Provider.setSortList(...createSortModels(DivisionsSortsLib));
      await Provider.store.dispatch('meta/getOptions', Provider.schema.value.building);
      // Provider.setSortModels(NewsSortsLib.byPublishedOn());
      await loadDivisions();
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Отделения',
        buttons: [{ text: 'Добавить отделение', type: 'primary', action: addDivision }],
      });
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'divisions', action: 'getAllWithCount' },
    });

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push(`/admin/divisions/${event.id}`);
    };

    const createFilterModels = (): IFilterModel[] => {
      return [];
    };

    const update = async (division: Division) => await Provider.store.dispatch('divisions/update', division);

    return {
      update,
      divisions,
      edit,
      remove,
      selectSearch,
      loadDivisions,
      createFilterModels,
      mounted: Provider.mounted,
      schema: Provider.schema,
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
</style>
