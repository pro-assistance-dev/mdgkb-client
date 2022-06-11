<template>
  <component :is="'AdminListWrapper'" v-if="mounted">
    <template #header>
      <RemoteSearch class="filters-block" :key-value="schema.division.key" @select="selectSearch" />
      <SortList class="filters-block" :models="sortList" :store-mode="true" @load="loadDivisions" />
    </template>
    <el-table :data="divisions">
      <el-table-column prop="name" label="Наименование" sortable> </el-table-column>
      <el-table-column prop="entrance.building.name" label="Корпус" sortable> </el-table-column>
      <el-table-column prop="address" label="Корпус" sortable> </el-table-column>
      <el-table-column prop="phone" label="Номер телефона" sortable> </el-table-column>
      <el-table-column prop="email" label="Email" sortable> </el-table-column>
      <el-table-column width="50" fixed="right" align="center">
        <template #default="scope">
          <el-switch v-model="scope.row.show" @change="update(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column width="50" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup :show-edit-button="true" :show-remove-button="true" @edit="edit(scope.row.id)" @remove="remove(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <Pagination />
    </template>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

import Pagination from '@/components/admin/Pagination.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList/SortList.vue';
import IDivision from '@/interfaces/buildings/IDivision';
import IFilterModel from '@/interfaces/filters/IFilterModel';
import ISortModel from '@/interfaces/filters/ISortModel';
import ISearchObject from '@/interfaces/ISearchObject';
import createSortModels from '@/services/CreateSortModels';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import DivisionsFiltersLib from '@/services/Provider/libs/filters/DivisionsFiltersLib';
import DivisionsSortsLib from '@/services/Provider/libs/sorts/DivisionsSortsLib';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminDivisionsList',
  components: { TableButtonGroup, Pagination, RemoteSearch, SortList, AdminListWrapper },
  setup() {
    const divisions = computed(() => Provider.store.getters['divisions/divisions']);
    const addDivision = () => Provider.router.push(`/admin/divisions/new`);
    const sortList: Ref<ISortModel[]> = ref([]);

    const edit = async (id: string): Promise<void> => {
      const item = divisions.value.find((i: IDivision) => i.id === id);
      if (item) await Provider.router.push(`/admin/divisions/${id}`);
    };

    const remove = async (id: string) => {
      await Provider.store.dispatch('divisions/remove', id);
    };

    const loadDivisions = async (): Promise<void> => {
      await Provider.store.dispatch('divisions/getAll', Provider.filterQuery.value);
    };

    const load = async (): Promise<void> => {
      Provider.setSortModels(DivisionsSortsLib.byName());
      sortList.value = [DivisionsSortsLib.byName(), DivisionsSortsLib.byCommentsCount()];
      Provider.store.commit('divisions/clearDivisions');
      Provider.setSortList(...createSortModels(DivisionsSortsLib));
      // Provider.setSortModels(NewsSortsLib.byPublishedOn());
      await loadDivisions();
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Отделения',
        buttons: [{ text: 'Добавить отделение', type: 'primary', action: addDivision }],
      });
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'divisions', action: 'getAll' },
      sortModels: [],
    });

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push(`/admin/divisions/${event.id}`);
    };

    const createFilterModels = (): IFilterModel[] => {
      return [DivisionsFiltersLib.withoutDrafts(), DivisionsFiltersLib.withDrafts()];
    };

    return {
      divisions,
      edit,
      remove,
      selectSearch,
      loadDivisions,
      createFilterModels,
      mounted: Provider.mounted,
      schema: Provider.schema,
      sortList: Provider.sortList,
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
