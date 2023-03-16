<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <template #header>
      <RemoteSearch key-value="dailyMenuOrder" placeholder="Введите номер заказа" @select="selectSearch" />
    </template>
    <template #sort>
      <SortList :max-width="400" @load="loadItems" />
    </template>
    <el-table :data="preparations">
      <el-table-column label="Название исследования" width="150" class-name="sticky-left">
        <template #default="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column width="50" align="center">
        <template #default="scope">
          <TableButtonGroup :show-remove-button="true" :show-edit-button="true" @edit="edit(scope.row.id)" @remove="remove(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
  </AdminListWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, Ref } from 'vue';

import Preparation from '@/classes/Preparation';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList/SortListV2.vue';
import Hooks from '@/services/Hooks/Hooks';
import ISearchObject from '@/services/interfaces/ISearchObject';
import PreparationsSortsLib from '@/services/Provider/libs/sorts/PreparationsSortsLib';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminPreparationsList',
  components: { AdminListWrapper, TableButtonGroup, SortList, RemoteSearch },
  setup() {
    const preparations: Ref<Preparation[]> = computed(() => Provider.store.getters['preparations/items']);

    Hooks.onBeforeMount(Provider.loadItems, {
      adminHeader: {
        title: 'Подготовка к исследованиям',
        buttons: [{ text: 'Добавить исследование', type: 'primary', action: Provider.createAdmin }],
      },
      pagination: { storeModule: 'preparations', action: 'getAllWithCount' },
      getAction: 'getAllWithCount',
      sortsLib: PreparationsSortsLib,
    });

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.toAdmin(`preparations/${event.id}`);
    };

    return { preparations, selectSearch, ...Provider.getAdminLib() };
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
