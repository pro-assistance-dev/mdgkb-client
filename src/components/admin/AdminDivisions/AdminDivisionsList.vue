<template>
  <div class="flex-column">
    <div class="flex-row-between">
      <el-button type="primary" @click="$router.push('/admin/divisions/new')">Добавить отделение</el-button>
      <!-- <el-pagination background layout="prev, pager, next" :total="100"> </el-pagination> -->
    </div>
    <el-card>
      <el-table :data="divisions" v-if="divisions">
        <el-table-column prop="name" label="Наименование" sortable> </el-table-column>
        <el-table-column prop="phone" label="Номер телефона" sortable> </el-table-column>
        <el-table-column prop="email" label="Email" sortable> </el-table-column>
        <el-table-column width="40" fixed="right" align="center">
          <template #default="scope">
            <TableButtonGroup @edit="edit(scope.row.id)" @remove="remove(scope.row.id)" :showEditButton="true" :showRemoveButton="true" />
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
import { useStore } from 'vuex';
import { defineComponent, computed, onMounted, ref } from 'vue';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'AdminDivisionsList',
  components: { TableButtonGroup },
  setup() {
    const store = useStore();
    const router = useRouter();
    const divisions = computed(() => store.getters['divisions/divisions']);

    store.commit('admin/setPageTitle', 'Отделения');
    const loadDivisions = async (): Promise<void> => {
      await store.dispatch('divisions/getAll');
    };

    const edit = async (id: string) => await router.push(`/admin/divisions/${id}`);
    const remove = async (id: string) => await store.dispatch('divisions/remove', id);

    onMounted(loadDivisions);

    return { divisions, remove, edit };
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
