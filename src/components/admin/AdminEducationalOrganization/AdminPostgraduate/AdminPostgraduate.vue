<template>
  <el-form v-if="mounted" ref="form" :model="postgraduateDocumentTypes" label-position="top" :rules="rules">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>Типы документов</span>
          <el-button type="success" @click="addDocType">Добавить тип</el-button>
        </div>
      </template>

      <el-card v-for="(postgraduateDocType, docTypeIndex) in postgraduateDocumentTypes" :key="docTypeIndex">
        <template #header>
          <div class="card-header">
            <el-form-item style="margin: 0 10px 0 0; width: 100%">
              <el-input v-model="postgraduateDocType.documentType.name" placeholder="Название типа документов"></el-input>
            </el-form-item>
            <el-button type="danger" icon="el-icon-close" @click="removeDocType(docTypeIndex)"></el-button>
          </div>
          <div>
            <el-form-item prop="description">
              <WysiwygEditor v-model="postgraduateDocType.documentType.description" />
            </el-form-item>
          </div>
        </template>
        <el-table :data="postgraduateDocType.documentType.documents">
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
              <el-button type="success" icon="el-icon-plus" size="mini" @click="addDocument(postgraduateDocType.documentType)"></el-button>
            </template>
            <template #default="scope">
              <TableButtonGroup :show-remove-button="true" @remove="removeDocument(postgraduateDocType.documentType, scope.$index)" />
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

import PostgraduateDocumentType from '@/classes/PostgraduateDocumentType';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import DocumentUploader from '@/components/DocumentUploader.vue';
import WysiwygEditor from '@/components/Editor/WysiwygEditor.vue';
import IDocumentType from '@/interfaces/document/IDocumentType';
import IPostgraduateDocumentType from '@/interfaces/IPostgraduateDocumentType';
import removeFromClass from '@/services/removeFromClass';
import sort from '@/services/sort';
import useConfirmLeavePage from '@/services/useConfirmLeavePage';
import validate from '@/services/validate';
export default defineComponent({
  name: 'AdminPostgraduate',
  components: {
    DocumentUploader,
    WysiwygEditor,
    TableButtonGroup,
  },
  setup() {
    const mounted = ref(false);
    const store = useStore();
    const form = ref();
    const storeModule = 'educationalOrganization';

    const postgraduateDocumentTypes: Ref<IPostgraduateDocumentType[]> = computed(() => store.getters['postgraduateDocumentTypes/items']);
    const postgraduateDocumentTypesForDelete: Ref<string[]> = ref([]);

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();

    onBeforeMount(async () => {
      store.commit('admin/showLoading');
      await store.dispatch('postgraduateDocumentTypes/getAll');
      store.commit('admin/setHeaderParams', { title: 'Сохранить', showBackButton: true, buttons: [{ action: submit }] });
      watch(postgraduateDocumentTypes, formUpdated, { deep: true });
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
        await store.dispatch('postgraduateDocumentTypes/update', {
          postgraduateDocumentTypes: postgraduateDocumentTypes.value,
          postgraduateDocumentTypesForDelete: postgraduateDocumentTypesForDelete.value,
        });
        ElMessage({ message: 'Сохранено', type: 'success' });
      } catch (error) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
    };

    const addDocType = (): void => {
      postgraduateDocumentTypes.value.push(new PostgraduateDocumentType());
    };

    const removeDocType = (index: number): void => {
      removeFromClass(index, postgraduateDocumentTypes.value, postgraduateDocumentTypesForDelete.value);
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
      postgraduateDocumentTypes,
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
