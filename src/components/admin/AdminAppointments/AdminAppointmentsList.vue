<template>
  <div class="flex-column">
    <el-card>
      <el-table :data="appointments">
        <el-table-column label="Дата" sortable>
          <template #default="scope">
            {{ $dateTimeFormatter.format(scope.row.date) }}
          </template>
        </el-table-column>
        <el-table-column label="Время" align="center" sortable>
          <template #default="scope">
            {{ scope.row.time }}
          </template>
        </el-table-column>
        <el-table-column label="Пользователь" sortable>
          <template #default="scope">
            {{ scope.row.formValue.user.human.getFullName() }}
          </template>
        </el-table-column>
        <el-table-column label="Специальность" sortable>
          <template #default="scope">
            {{ scope.row.specialization }}
          </template>
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
  name: 'AdminDoctorsList',
  components: { TableButtonGroup, Pagination },
  setup() {
    const appointments = computed(() => Provider.store.getters['appointments/items']);

    const load = async () => {
      Provider.store.commit('filter/setStoreModule', 'appointments');
      await Provider.store.dispatch('appointments/getAll', Provider.store.getters['filter/filterQuery']);
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Записи к врачу',
        buttons: [{ text: 'Добавить запись', type: 'primary', action: create }],
      });
    };

    Hooks.onBeforeMount(load, {
      pagination: { storeModule: 'appointments', action: 'getAll' },
      sortModels: [],
    });

    const create = () => Provider.router.push(`/admin/appointments/new`);
    const edit = (id: string) => Provider.router.push(`/admin/appointments/${id}`);
    const remove = async (id: string) => await Provider.store.dispatch('appointments/remove', id);

    return { appointments, remove, edit, create };
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
