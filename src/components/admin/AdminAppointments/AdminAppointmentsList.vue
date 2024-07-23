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
import { defineComponent } from 'vue';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import Hooks from '@/services/Hooks/Hooks';

export default defineComponent({
  name: 'AdminAppointmentsList',
  components: { TableButtonGroup },
  setup() {
    const appointments = AppointmentsStore.Items();

    const load = async () => {};

    Hooks.onBeforeMount(load);

    const create = () => Router.To(`/admin/appointments/new`);
    const edit = (id: string) => Router.To(`/admin/appointments/${id}`);
    const remove = async (id: string) => await AppointmentsStore.Remove(id);

    return { appointments, remove, edit, create };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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
