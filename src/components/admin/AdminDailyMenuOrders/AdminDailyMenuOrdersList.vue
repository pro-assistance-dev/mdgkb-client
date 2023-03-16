<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <template #header>
      <RemoteSearch key-value="dailyMenuOrder" placeholder="Введите номер заказа" @select="selectSearch" />
    </template>
    <template #sort>
      <SortList :max-width="400" @load="loadItems" />
    </template>
    <el-table :data="dailyMenuOrders">
      <el-table-column label="Статус" width="150" class-name="sticky-left">
        <template #default="scope">
          <TableFormStatus :form="scope.row.formValue" />
        </template>
      </el-table-column>
      <el-table-column label="Номер заказа" align="center" sortable>
        <template #default="scope">
          {{ scope.row.number }}
        </template>
      </el-table-column>
      <el-table-column label="Время" align="center" sortable>
        <template #default="scope">
          {{
            $dateTimeFormatter.format(scope.row.formValue.createdAt, {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: 'numeric',
              minute: 'numeric',
            })
          }}
        </template>
      </el-table-column>
      <el-table-column label="ФИО" sortable>
        <template #default="scope">
          {{ scope.row.formValue.user.human.getFullName() }}
        </template>
      </el-table-column>
      <el-table-column label="Email" sortable>
        <template #default="scope">
          {{ scope.row.formValue.user.email }}
        </template>
      </el-table-column>
      <el-table-column label="Телефон" sortable>
        <template #default="scope">
          <a :href="'tel:' + scope.row.formValue.user.phone">{{ scope.row.formValue.user.phone }}</a>
        </template>
      </el-table-column>

      <el-table-column label="Стоимость заказа" sortable>
        <template #default="scope">
          <el-tooltip class="box-item" effect="dark" placement="top-start" trigger="click">
            <template #content>
              <div v-for="dailyMenuOrderItem in scope.row.dailyMenuOrderItems" :key="dailyMenuOrderItem.id">
                {{ dailyMenuOrderItem.dailyMenuItem.name }} ({{ dailyMenuOrderItem.quantity }} шт.)
              </div>
            </template>

            <el-button>{{ scope.row.dailyMenuOrderItems.length }} блюда </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="Стоимость заказа" sortable>
        <template #default="scope"> {{ scope.row.getPriceSum() }} руб. </template>
      </el-table-column>
      <el-table-column width="50" align="center">
        <template #default="scope">
          <TableButtonGroup :show-edit-button="true" @edit="edit(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
  </AdminListWrapper>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import TableFormStatus from '@/components/FormConstructor/TableFormStatus.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList/SortListV2.vue';
import Hooks from '@/services/Hooks/Hooks';
import ISearchObject from '@/services/interfaces/ISearchObject';
import DailyMenuOrdersSortsLib from '@/services/Provider/libs/sorts/DailyMenuOrdersSortsLib';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminDailyMenuOrdersList',
  components: { AdminListWrapper, TableButtonGroup, SortList, TableFormStatus, RemoteSearch },
  setup() {
    const dailyMenuOrders = computed(() => Provider.store.getters['dailyMenuOrders/items']);

    Hooks.onBeforeMount(Provider.loadItems, {
      adminHeader: {
        title: 'Буфет. Заказы',
        buttons: [],
      },
      pagination: { storeModule: 'dailyMenuOrders', action: 'getAllWithCount' },
      getAction: 'getAllWithCount',
      sortsLib: DailyMenuOrdersSortsLib,
    });

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.toAdmin(`/daily-menu-orders/${event.id}`);
    };

    return { dailyMenuOrders, selectSearch, ...Provider.getAdminLib() };
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
