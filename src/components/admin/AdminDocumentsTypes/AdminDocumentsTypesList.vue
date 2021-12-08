<template>
  <div class="flex-column">
    <el-card>
      <el-table :data="documents">
        <el-table-column prop="name" label="Наименование" sortable> </el-table-column>
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
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';

export default defineComponent({
  name: 'AdminDocumentsTypesList',
  components: { TableButtonGroup },
  setup() {
    const store = useStore();
    const router = useRouter();
    const documents = computed(() => store.getters['documentTypes/items']);

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('documentTypes/getAll');
      store.commit('admin/setHeaderParams', {
        title: 'Документы',
        buttons: [{ text: 'Добавить документ', type: 'primary', action: create }],
      });
      store.commit('admin/closeLoading');
    });

    const create = () => router.push(`/admin/documents-types/new`);
    const edit = (id: string) => router.push(`/admin/documents-types/${id}`);
    const remove = async (id: string) => await store.dispatch('documentTypes/remove', id);

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
