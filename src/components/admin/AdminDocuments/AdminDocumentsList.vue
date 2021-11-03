<template>
  <div class="flex-column">
    <div class="flex-row-between">
      <el-button type="primary" @click="create">Добавить документ</el-button>
    </div>
    <el-card>
      <el-table :data="documents">
        <el-table-column prop="name" label="Наименование" sortable> </el-table-column>
        <el-table-column width="40" fixed="right" align="center">
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
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';

export default defineComponent({
  name: 'AdminDivisionsList',
  components: { TableButtonGroup },
  setup() {
    const store = useStore();
    const router = useRouter();
    const documents = computed(() => store.getters['documents/items']);

    onBeforeMount(() => store.commit('admin/showLoading'));

    const create = () => router.push(`/admin/documents/new`);
    const edit = (id: string) => router.push(`/admin/documents/${id}`);
    const remove = async (id: string) => await store.dispatch('documents/remove', id);

    onMounted(async (): Promise<void> => {
      await store.dispatch('documents/getAll');
      store.commit('admin/setPageTitle', { title: 'Документы' });
    });

    return { documents, remove, edit, create };
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
