<template>
  <AdminDocumentTypesForm v-if="mounted" store-module="admissionCommitteeDocumentTypes" :doc-types-for-delete="docsForDelete" />
</template>

<script lang="ts">
import { computed, defineComponent, Ref, watch } from 'vue';

import AdminDocumentTypesForm from '@/components/admin/AdminDocumentsTypes/AdminDocumentTypesForm.vue';
import IAdmissionCommitteeDocumentType from '@/interfaces/IAdmissionCommitteeDocumentType';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'AdminAdmissionCommittee',
  components: {
    AdminDocumentTypesForm,
  },
  setup() {
    const docs: Ref<IAdmissionCommitteeDocumentType[]> = computed(() => Provider.store.getters['admissionCommitteeDocumentTypes/items']);
    const docsForDelete: Ref<string[]> = computed(() => Provider.store.getters['admissionCommitteeDocumentTypes/itemsForDelete']);

    const { formUpdated } = useConfirmLeavePage();

    const submit = async () => {
      await Provider.store.dispatch('admissionCommitteeDocumentTypes/update');
    };

    const load = async () => {
      await Provider.store.dispatch('admissionCommitteeDocumentTypes/getAll');
      Provider.store.commit('admin/setHeaderParams', { title: 'Сохранить', showBackButton: true, buttons: [{ action: submit }] });
      watch(docs, formUpdated, { deep: true });
    };

    Hooks.onBeforeRouteLeave(Hooks.submit(submit));
    Hooks.onBeforeMount(load);

    return {
      docs,
      docsForDelete,
      mounted: Provider.mounted,
    };
  },
});
</script>

<style lang="scss" scoped>
.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-container {
  .el-card {
    margin-bottom: 20px;
  }
}
.page-container {
  display: flex;
  flex-direction: column;
}
.el-card {
  margin-bottom: 20px;
}
:deep(.avatar-uploader-cover) {
  text-align: start;
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
