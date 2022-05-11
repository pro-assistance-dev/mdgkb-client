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
        <el-table-column label="Пациент" sortable>
          <template #default="scope">
            {{ scope.row.child }}
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
              @edit="edit(scope.row.human.slug)"
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
import { computed, defineComponent, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import Pagination from '@/components/admin/Pagination.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';

export default defineComponent({
  name: 'AdminDoctorsList',
  components: { TableButtonGroup, Pagination },
  setup() {
    const store = useStore();
    const router = useRouter();
    const appointments = computed(() => store.getters['appointments/items']);

    onBeforeMount(async () => {
      store.commit('admin/showLoading');

      store.commit('filter/setStoreModule', 'appointments');
      await store.dispatch('appointments/getAll', store.getters['filter/filterQuery']);

      store.commit('admin/setHeaderParams', {
        title: 'Записи к врачу',
        buttons: [{ text: 'Добавить запись', type: 'primary', action: create }],
      });
      store.commit('pagination/setCurPage', 1);
      store.commit('admin/closeLoading');
    });

    const create = () => router.push(`/admin/appointments/new`);
    const edit = (slug: string) => router.push(`/admin/appointments/${slug}`);
    const remove = async (id: string) => await store.dispatch('appointments/remove', id);

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
