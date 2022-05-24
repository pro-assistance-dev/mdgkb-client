<template>
  <el-form v-if="mounted" ref="form" :model="withDocumentTypes" label-position="top">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>Типы документов</span>
          <el-button type="success" @click="addDocType">Добавить тип</el-button>
        </div>
      </template>

      <el-card v-for="(docType, docTypeIndex) in withDocumentTypes" :key="docTypeIndex">
        <template #header>
          <div class="card-header">
            <el-form-item style="margin: 0 10px 0 0; width: 100%">
              <el-input v-model="docType.documentType.name" placeholder="Название типа документов"></el-input>
            </el-form-item>
            <el-button type="danger" icon="el-icon-close" @click="removeDocType(docTypeIndex)"></el-button>
          </div>
          <div>
            <el-form-item prop="description">
              <Editor v-model="docType.documentType.description" />
            </el-form-item>
          </div>
        </template>
        <el-table :data="docType.documentType.documents">
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
              <el-button type="success" icon="el-icon-plus" size="mini" @click="addDocument(docType.documentType)"></el-button>
            </template>
            <template #default="scope">
              <TableButtonGroup :show-remove-button="true" @remove="removeDocument(docType.documentType, scope.$index)" />
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-card>
  </el-form>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref } from 'vue';

import WithDocumentType from '@/classes/WithDocumentType';
import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import DocumentUploader from '@/components/DocumentUploader.vue';
import Editor from '@/components/Editor/Editor.vue';
import IDocumentType from '@/interfaces/document/IDocumentType';
import IWithDocumentType from '@/interfaces/IWithDocumentType';
import removeFromClass from '@/mixins/removeFromClass';
import sort from '@/mixins/sort';
import Provider from '@/services/Provider';
export default defineComponent({
  name: 'AdminDocumentTypesForm',
  components: {
    Editor,
    DocumentUploader,
    // QuillEditor,
    TableButtonGroup,
  },
  props: {
    storeModule: {
      type: String,
      required: true,
    },
    docTypesForDelete: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup(props) {
    const withDocumentTypes: Ref<IWithDocumentType[]> = computed(() => Provider.store.getters[`${props.storeModule}/items`]);
    // const withDocumentTypesForDelete: Ref<string[]> = ref([]);

    const addDocType = (): void => {
      withDocumentTypes.value.push(new WithDocumentType());
    };

    const removeDocType = (index: number): void => {
      removeFromClass(index, withDocumentTypes.value, props.docTypesForDelete);
    };

    // const load = async () => {
    //   await Provider.store.dispatch(`${props.storeModule}/getAll`);
    // };
    //
    // Hooks.onBeforeMount(load);

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
      removeDocType,
      addDocType,
      withDocumentTypes,
      addDocument,
      sort,
      getFileUrl,
      mounted: Provider.mounted,
      form: Provider.form,
      removeDocument,
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
