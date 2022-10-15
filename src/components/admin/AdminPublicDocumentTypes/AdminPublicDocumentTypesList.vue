<template>
  <el-card v-if="mounted">
    <el-table :data="publicDocumentTypes">
      <el-table-column v-if="isEditMode" width="50" align="center">
        <template #default="scope">
          <TableMover :ordered-items="publicDocumentTypes" :index="scope.$index" />
        </template>
      </el-table-column>
      <el-table-column label="Наименование">
        <template #default="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="50" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup :show-edit-button="true" :show-remove-button="true" @remove="remove(scope.row.id)" @edit="edit(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import TableMover from '@/components/admin/TableMover.vue';
import IPublicDocumentType from '@/interfaces/IPublicDocumentType';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'AdminPublicDocumentTypesList',
  components: { TableButtonGroup, TableMover },

  setup() {
    const isEditMode: Ref<boolean> = ref(false);
    const isNotEditMode: ComputedRef<boolean> = computed(() => !isEditMode.value);
    const publicDocumentTypes: ComputedRef<IPublicDocumentType[]> = computed(() => Provider.store.getters['publicDocumentTypes/items']);

    const edit = (id: string): void => {
      Provider.router.push(`/admin/public-document-types/${id}`);
    };
    const create = () => {
      Provider.router.push('/admin/public-document-types/new');
    };
    const remove = (id: string) => {
      Provider.store.dispatch('publicDocumentTypes/remove', id);
    };

    const submit = async () => {
      if (isEditMode.value) {
        await Provider.store.dispatch('publicDocumentTypes/updateOrder');
      }
      isEditMode.value = !isEditMode.value;
    };

    const load = async () => {
      await Provider.store.dispatch('publicDocumentTypes/getAll');
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Разделы документов',
        buttons: [
          { text: 'Сохранить', condition: isEditMode, action: submit },
          { text: 'Редактировать', condition: isNotEditMode, action: submit },
          { text: 'Добавить', type: 'primary', action: create },
        ],
      });
    };

    Hooks.onBeforeMount(load);

    return {
      mounted: Provider.mounted,
      publicDocumentTypes,
      edit,
      remove,
      isEditMode,
    };
  },
});
</script>
