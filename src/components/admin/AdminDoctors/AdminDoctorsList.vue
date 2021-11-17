<template>
  <div class="flex-column">
    <div class="flex-row-between">
      <el-button type="primary" @click="create">Добавить врача</el-button>
      <!-- <el-pagination background layout="prev, pager, next" :total="100"> </el-pagination> -->
    </div>
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
            {{ scope.row.division.name }}
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
    </el-card>
    <div class="flex-row-end">
      <!-- <el-pagination background layout="prev, pager, next" :total="100"> </el-pagination> -->
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';

export default defineComponent({
  name: 'AdminDoctorsList',
  components: { TableButtonGroup },
  setup() {
    const store = useStore();
    const router = useRouter();
    const doctors = computed(() => store.getters['doctors/items']);

    onBeforeMount(() => store.commit('admin/showLoading'));

    const loadDivisions = async (): Promise<void> => {
      await store.dispatch('doctors/getAll');
      store.commit('admin/setPageTitle', { title: 'Врачи' });
    };

    const create = () => router.push(`/admin/doctors/new`);
    const edit = (id: string) => router.push(`/admin/doctors/${id}`);
    const remove = async (id: string) => await store.dispatch('doctors/remove', id);
    const fillDateFormat = (date: Date) => (date ? Intl.DateTimeFormat('ru-RU').format(new Date(date)) : '');

    onMounted(loadDivisions);

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
</style>
