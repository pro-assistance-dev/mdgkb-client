<template>
  <component :is="'AdminListWrapper'" v-if="mounted">
    <el-table :data="docs">
      <el-table-column v-if="isEditMode" width="50" align="center">
        <template #default="scope">
          <TableMover :ordered-items="docs" :index="scope.$index" />
        </template>
      </el-table-column>
      <el-table-column prop="documentType.name" label="Название">
        <template #default="scope">
          {{ scope.row.documentType.name }}
        </template>
      </el-table-column>
      <el-table-column width="50" align="center" class-name="sticky-right">
        <template #default="scope">
          <TableButtonGroup :show-edit-button="true" :show-remove-button="true" @edit="edit(scope.row.id)" @remove="remove(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
  </component>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref, watch } from 'vue';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import TableMover from '@/components/admin/TableMover.vue';
import IAdmissionCommitteeDocumentType from '@/interfaces/IAdmissionCommitteeDocumentType';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminAdmissionCommitteeList',
  components: {
    AdminListWrapper,
    TableButtonGroup,
    TableMover,
  },
  setup() {
    const docs: ComputedRef<IAdmissionCommitteeDocumentType[]> = computed(
      () => Provider.store.getters['admissionCommitteeDocumentTypes/items']
    );
    const docsForDelete: ComputedRef<string[]> = computed(() => Provider.store.getters['admissionCommitteeDocumentTypes/itemsForDelete']);
    const isEditMode: Ref<boolean> = ref(false);
    const isNotEditMode: ComputedRef<boolean> = computed(() => !isEditMode.value);

    const { formUpdated } = useConfirmLeavePage();

    const submit = async () => {
      if (isEditMode.value) {
        await Provider.store.dispatch('admissionCommitteeDocumentTypes/updateOrder');
      }
      isEditMode.value = !isEditMode.value;
    };

    const create = () => {
      Provider.router.push({ name: 'AdminAdmissionCommitteePageNew' });
    };

    const edit = (id: string) => {
      Provider.router.push({ name: 'AdminAdmissionCommitteePageEdit', params: { id } });
    };

    const remove = async (id: string) => {
      await Provider.store.dispatch('admissionCommitteeDocumentTypes/remove', id);
    };

    const load = async () => {
      await Provider.store.dispatch('admissionCommitteeDocumentTypes/getAll');
      Provider.store.commit('admin/setHeaderParams', {
        title: 'Приемная коммиссия',
        buttons: [
          { text: 'Сохранить', condition: isEditMode, action: submit },
          { text: 'Редактировать', condition: isNotEditMode, action: submit },
          { text: 'Добавить', type: 'primary', action: create },
        ],
      });
      watch(docs, formUpdated, { deep: true });
    };

    // Hooks.onBeforeRouteLeave(Hooks.submit(submit));
    Hooks.onBeforeMount(load);

    return {
      docs,
      docsForDelete,
      mounted: Provider.mounted,
      edit,
      remove,
      isEditMode,
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
