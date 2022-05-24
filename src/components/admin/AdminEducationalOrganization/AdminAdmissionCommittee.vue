<template>
  <AdminDocumentTypesForm store-module="admissionCommitteeDocumentTypes" />
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from 'vue';

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
    const admissionCommitteeDocumentTypes: Ref<IAdmissionCommitteeDocumentType[]> = computed(
      () => Provider.store.getters['admissionCommitteeDocumentTypes/items']
    );
    const admissionCommitteeDocumentTypesForDelete: Ref<string[]> = ref([]);

    const { formUpdated } = useConfirmLeavePage();

    const submit = Hooks.submit('admissionCommitteeDocumentTypes/update', {
      admissionCommitteeDocumentTypes: admissionCommitteeDocumentTypes.value,
      admissionCommitteeDocumentTypesForDelete: admissionCommitteeDocumentTypesForDelete.value,
    });

    const load = async () => {
      await Provider.store.dispatch('admissionCommitteeDocumentTypes/getAll');
      Provider.store.commit('admin/setHeaderParams', { title: 'Сохранить', showBackButton: true, buttons: [{ action: submit }] });
      watch(admissionCommitteeDocumentTypes, formUpdated, { deep: true });
    };

    Hooks.onBeforeRouteLeave(submit);
    Hooks.onBeforeMount(load);

    return {
      admissionCommitteeDocumentTypes,
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
