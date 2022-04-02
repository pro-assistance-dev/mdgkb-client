<template>
  <el-form v-if="mounted" ref="form" :model="candidateDocumentTypes" label-position="top" :rules="rules">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>Типы документов</span>
          <el-button type="success" @click="addDocType">Добавить тип</el-button>
        </div>
      </template>
      <el-card v-for="(candidateDocType, docTypeIndex) in candidateDocumentTypes" :key="docTypeIndex">
        <template #header>
          <div class="card-header">
            <el-form-item style="margin: 0 10px 0 0; width: 100%">
              <el-input v-model="candidateDocType.documentType.name" placeholder="Название типа документов"></el-input>
            </el-form-item>
            <el-button type="danger" icon="el-icon-close" @click="removeDocType(docTypeIndex)"></el-button>
          </div>
        </template>
        <el-table :data="candidateDocType.documentType.documents">
          <el-table-column prop="name" label="Название документа">
            <template #default="scope">
              <el-form-item size="mini" style="margin: 0">
                <el-input v-model="scope.row.name" placeholder="Название документа"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="Документ">
            <template #default="scope">
              <DocumentUploader :document="scope.row" />
            </template>
          </el-table-column>
          <el-table-column width="70" align="center">
            <template #header>
              <el-button type="success" icon="el-icon-plus" size="mini" @click="addDocument(candidateDocType.documentType)"></el-button>
            </template>
            <template #default="scope">
              <TableButtonGroup :show-remove-button="true" @remove="removeDocument(candidateDocType.documentType, scope.$index)" />
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-card>
  </el-form>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';
import { useStore } from 'vuex';

import CandidateDocumentType from '@/classes/CandidateDocumentType';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import DocumentUploader from '@/components/DocumentUploader.vue';
import IDocumentType from '@/interfaces/document/IDocumentType';
import ICandidateDocumentType from '@/interfaces/ICandidateDocumentType';
import removeFromClass from '@/mixins/removeFromClass';
import sort from '@/mixins/sort';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import validate from '@/mixins/validate';
export default defineComponent({
  name: 'AdminCandidate',
  components: {
    DocumentUploader,
    TableButtonGroup,
  },
  setup() {
    const mounted = ref(false);
    const store = useStore();
    const form = ref();
    const storeModule = 'educationalOrganization';

    const candidateDocumentTypes: Ref<ICandidateDocumentType[]> = computed(() => store.getters['candidateDocumentTypes/items']);
    const candidateDocumentTypesForDelete: Ref<string[]> = ref([]);

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('candidateDocumentTypes/getAll');
      store.commit('admin/setHeaderParams', { title: 'Сохранить', showBackButton: true, buttons: [{ action: submit }] });
      watch(candidateDocumentTypes, formUpdated, { deep: true });
      mounted.value = true;
      store.commit('admin/closeLoading');
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submit, next);
    });

    const submit = async () => {
      saveButtonClick.value = true;
      if (!validate(form)) {
        saveButtonClick.value = false;
        return;
      }
      try {
        await store.dispatch('candidateDocumentTypes/update', {
          candidateDocumentTypes: candidateDocumentTypes.value,
          candidateDocumentTypesForDelete: candidateDocumentTypesForDelete.value,
        });
        ElMessage({ message: 'Сохранено', type: 'success' });
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
    };

    const addDocType = (): void => {
      candidateDocumentTypes.value.push(new CandidateDocumentType());
    };

    const removeDocType = (index: number): void => {
      removeFromClass(index, candidateDocumentTypes.value, candidateDocumentTypesForDelete.value);
    };

    const getFileUrl = (path: string): string => {
      return `${process.env.VUE_APP_STATIC_URL}/${path}`;
    };

    const addDocument = (docType: IDocumentType) => {
      docType.addDocument();
    };

    const removeDocument = (docType: IDocumentType, index: number) => {
      docType.removeDocument(index);
    };

    return {
      addDocument,
      sort,
      getFileUrl,
      storeModule,
      removeDocType,
      addDocType,
      mounted,
      form,
      // rules,
      candidateDocumentTypes,
      removeDocument,
      submit,
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
