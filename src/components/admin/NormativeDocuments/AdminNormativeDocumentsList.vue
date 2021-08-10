<template>
  <div class="flex-column">
    <div class="flex-row-between">
      <el-button type="primary" @click="$router.push('/admin/normative-documents/new')">Добавить документ</el-button>
    </div>
    <el-card v-if="documents">
      <el-table v-if="documents" :data="documents" row-key="id">
        <el-table-column prop="name" label="Наименование" sortable />
        <el-table-column prop="type.name" label="Тип" sortable />
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
import { defineComponent, onBeforeMount, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';

export default defineComponent({
  name: 'AdminNormativeDocumentsList',
  components: { TableButtonGroup },

  setup() {
    const store = useStore();
    const router = useRouter();
    const documents = computed(() => store.getters['normativeDocuments/documents']);

    const edit = async (id: string): Promise<void> => {
      await router.push(`/admin/normative-documents/${id}`);
    };

    const remove = async (id: string) => {
      await store.dispatch('normativeDocuments/remove', id);
      await store.dispatch('normativeDocuments/getAll');
    };

    onBeforeMount(async () => {
      store.commit('admin/setPageTitle', 'Нормативные документы');
      await store.dispatch('normativeDocuments/getAll');
    });

    return {
      documents,
      edit,
      remove,
    };
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
