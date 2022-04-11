<template>
  <el-card v-if="mounted">
    <el-table :data="publicDocumentTypes">
      <el-table-column label="Наименование">
        <template #default="scope">
          <span>{{ scope.row.publicDocumentType.name }}</span>
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
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import IEducationPublicDocumentType from '@/interfaces/IEducationPublicDocumentType';

export default defineComponent({
  name: 'AdminEducationPublicDocumentTypesList',
  components: { TableButtonGroup },

  setup() {
    const store = useStore();
    const router = useRouter();
    const mounted: Ref<boolean> = ref(false);
    const publicDocumentTypes: ComputedRef<IEducationPublicDocumentType[]> = computed(
      () => store.getters['educationPublicDocumentTypes/items']
    );

    const edit = (id: string): void => {
      router.push(`/admin/education-public-document-types/${id}`);
    };
    const create = () => {
      router.push('/admin/education-public-document-types/new');
    };
    const remove = (id: string) => {
      store.dispatch('educationPublicDocumentTypes/remove', id);
    };

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('educationPublicDocumentTypes/getAll');
      store.commit('admin/setHeaderParams', {
        title: 'Разделы документов',
        buttons: [{ text: 'Добавить', type: 'primary', action: create }],
      });
      mounted.value = true;
      store.commit('admin/closeLoading');
    });

    return {
      mounted,
      publicDocumentTypes,
      edit,
      remove,
    };
  },
});
</script>
