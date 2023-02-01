<template>
  <div class="flex-column">
    <!-- <div class="flex-row-between"> -->
    <!-- <el-button type="primary" @click="create">Добавить врача</el-button> -->
    <!-- <el-pagination background layout="prev, pager, next" :total="100"> </el-pagination> -->
    <!-- </div> -->
    <el-card>
      <el-table :data="doctors">
        <el-table-column label="ФИО" sortable>
          <template #default="scope">
            {{ scope.row.employee.human.getFullName() }}
          </template>
        </el-table-column>
        <el-table-column label="Пол" align="center" sortable>
          <template #default="scope">
            {{ scope.row.employee.human.getGender() }}
          </template>
        </el-table-column>
        <el-table-column label="Дата рождения" sortable>
          <template #default="scope">
            {{ $dateTimeFormatter.format(scope.row.employee.human.dateBirth) }}
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
import { computed, defineComponent, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';

export default defineComponent({
  name: 'AdminHeadsList',
  components: { TableButtonGroup },
  setup() {
    const store = useStore();
    const router = useRouter();
    const doctors = computed(() => store.getters['heads/items']);

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await loadDivisions();
      store.commit('admin/closeLoading');
    });

    const loadDivisions = async (): Promise<void> => {
      await store.dispatch('heads/getAll');
      store.commit('admin/setHeaderParams', {
        title: 'Руководители',
        buttons: [{ text: 'Добавить руководителя', type: 'primary', action: create }],
      });
    };

    const create = () => router.push(`/admin/heads/new`);
    const edit = (id: string) => router.push(`/admin/heads/${id}`);
    const remove = async (id: string) => await store.dispatch('heads/remove', id);

    return { doctors, remove, edit, create };
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
