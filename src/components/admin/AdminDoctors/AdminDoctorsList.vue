<template>
  <div class="flex-column">
    <RemoteSearch />
    <el-card>
      <el-table :data="doctors">
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
            {{ fillDateFormat(scope.row.human.dateBirth) }}
          </template>
        </el-table-column>
        <el-table-column label="Отделение" sortable>
          <template #default="scope">
            <el-tag class="tag-link" size="small" @click="$router.push(`/admin/divisions/${scope.row.division.id}`)">
              {{ scope.row.division.name }}
            </el-tag>
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
import RemoteSearch from '@/components/admin/RemoteSearch.vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';

export default defineComponent({
  name: 'AdminDoctorsList',
  components: { TableButtonGroup, Pagination, RemoteSearch },
  setup() {
    const store = useStore();
    const router = useRouter();
    const doctors = computed(() => store.getters['doctors/items']);

    onBeforeMount(async () => {
      store.commit('admin/showLoading');

      store.commit('filter/setStoreModule', 'doctors');
      await store.dispatch('doctors/getAll', store.getters['filter/filterQuery']);

      store.commit('admin/setHeaderParams', { title: 'Врачи', buttons: [{ text: 'Добавить врача', type: 'primary', action: create }] });
      store.commit('pagination/setCurPage', 1);
      store.commit('admin/closeLoading');
    });

    const create = () => router.push(`/admin/doctors/new`);
    const edit = (slug: string) => router.push(`/admin/doctors/${slug}`);
    const remove = async (id: string) => await store.dispatch('doctors/remove', id);
    const fillDateFormat = (date: Date) => (date ? Intl.DateTimeFormat('ru-RU').format(new Date(date)) : '');

    return { doctors, remove, edit, create, fillDateFormat };
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
