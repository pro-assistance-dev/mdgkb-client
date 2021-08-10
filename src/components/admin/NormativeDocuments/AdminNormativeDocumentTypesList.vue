<template>
  <div class="flex-column">
    <div class="flex-row-between">
      <el-button type="primary" @click="$router.push('/admin/normative-document-types/new')">Добавить тип</el-button>
    </div>
    <el-card v-if="documentTypes">
      <el-table v-if="documentTypes" :data="documentTypes" row-key="id">
        <el-table-column prop="name" label="Наименование" sortable />
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
  name: 'AdminNormativeDocumentTypesList',
  components: { TableButtonGroup },

  setup() {
    const store = useStore();
    const router = useRouter();
    const documentTypes = computed(() => store.getters['normativeDocumentTypes/types']);

    const edit = async (id: string): Promise<void> => {
      await router.push(`/admin/normative-document-types/${id}`);
    };

    const remove = async (id: string) => {
      await store.dispatch('normativeDocumentTypes/remove', id);
      await store.dispatch('normativeDocumentTypes/getAll');
    };

    onBeforeMount(async () => {
      await store.dispatch('normativeDocumentTypes/getAll');
      store.commit('admin/setPageTitle', 'Типы нормативных документов');
    });

    return {
      documentTypes,
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
