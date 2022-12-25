<template>
  <div class="flex-column">
    <el-card>
      <el-table :data="dailyMenuOrders">
        <el-table-column label="Номер заказа" align="center" sortable>
          <template #default="scope">
            {{ scope.row.number }}
          </template>
        </el-table-column>
        <el-table-column label="Время" align="center" sortable>
          <template #default="scope">
            {{ $dateTimeFormatter.format(scope.row.formValue.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column label="Пользователь" sortable>
          <template #default="scope">
            {{ scope.row.formValue.user.human.getFullName() }}
          </template>
        </el-table-column>
        <el-table-column label="Стоимость заказа" sortable>
          <template #default="scope"> {{ scope.row.price }} руб. </template>
        </el-table-column>
        <el-table-column width="50" fixed="right" align="center">
          <template #default="scope">
            <TableButtonGroup
              :show-edit-button="true"
              :show-remove-button="true"
              @edit="edit(scope.row.id)"
              @remove="remove(scope.row.id)"
            />
          </template>
        </el-table-column>
      </el-table>
      <Pagination />
    </el-card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import Pagination from '@/components/admin/Pagination.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'AdminDailyMenuOrdersList',
  components: { TableButtonGroup, Pagination },
  setup() {
    const dailyMenuOrders = computed(() => Provider.store.getters['dailyMenuOrders/items']);

    const load = async () => {
      Provider.store.commit('filter/setStoreModule', 'dailyMenuOrders');
      await Provider.store.dispatch('dailyMenuOrders/getAll', Provider.store.getters['filter/filterQuery']);
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Заказы еды',
      });
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'dailyMenuOrders', action: 'getAll' },
      sortModels: [],
    });

    const edit = (id: string) => Provider.router.push(`/admin/daily-menu-orders/${id}`);
    const remove = async (id: string) => await Provider.store.dispatch('dailyMenuOrders/remove', id);

    return { dailyMenuOrders, remove, edit };
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
