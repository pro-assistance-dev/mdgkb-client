<template>
  <el-table :data="documentType.documents">
    <el-table-column width="50" fixed="left" align="center">
      <template #default="scope">
        <TableMover :ordered-items="documentType.documents" :index="scope.$index" />
      </template>
    </el-table-column>
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
        <el-button type="success" icon="el-icon-plus" size="mini" @click="documentType.addDocument()"></el-button>
      </template>
      <template #default="scope">
        <TableButtonGroup
          :show-remove-button="true"
          @remove="removeFromClass(scope.$index, documentType.documents, documentType.documentsForDelete)"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import TableButtonGroup from '@/components/admin/TableButtonGroup.vue';
import TableMover from '@/components/admin/TableMover.vue';
import DocumentUploader from '@/components/DocumentUploader.vue';
import IDocumentType from '@/interfaces/document/IDocumentType';
import removeFromClass from '@/mixins/removeFromClass';
import Provider from '@/services/Provider';
export default defineComponent({
  name: 'AdminDocumentsForm',
  components: {
    DocumentUploader,
    TableMover,
    TableButtonGroup,
  },
  props: {
    documentType: {
      type: Object as PropType<IDocumentType>,
      required: true,
    },
  },
  setup() {
    return {
      mounted: Provider.mounted,
      form: Provider.form,
      removeFromClass,
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
