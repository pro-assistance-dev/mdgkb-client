<template>
  <el-table :data="form.fields">
    <el-table-column label="Наименование">
      <template #default="scope">
        {{ scope.row.name }}
      </template>
    </el-table-column>

    <el-table-column label="Данные">
      <template #default="scope">
        <el-form-item v-if="scope.row.valueType.isString()" style="margin: 0">
          <el-input v-model="form.findFieldValue(scope.row.id).valueString" />
        </el-form-item>
        <el-form-item v-if="scope.row.valueType.isNumber()" style="margin: 0">
          <el-input-number v-model="form.findFieldValue(scope.row.id).valueNumber" />
        </el-form-item>
        <el-form-item v-if="scope.row.valueType.isDate()" style="margin: 0">
          <el-date-picker v-model="form.findFieldValue(scope.row.id).valueDate" />
        </el-form-item>
        <el-form-item v-if="scope.row.valueType.isText()" style="margin: 0">
          <el-input v-model="form.findFieldValue(scope.row.id).valueString" type="textarea" />
        </el-form-item>
        <el-form-item v-if="scope.row.valueType.isFile()" style="margin: 0">
          <FileUploader :file-info="form.findFieldValue(scope.row.id).file" />
        </el-form-item>
      </template>
    </el-table-column>

    <el-table-column label="Образец" sortable>
      <template #default="scope">
        <a v-if="scope.row.file.fileSystemPath" :href="scope.row.file.getFileUrl()" target="_blank">
          {{ scope.row.file.originalName }}
        </a>
        <!-- <span v-else>Нет файла</span> -->
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import FileUploader from '@/components/FileUploader.vue';
import IForm from '@/interfaces/IForm';

export default defineComponent({
  name: 'FieldValuesForm',
  components: { FileUploader },
  props: {
    form: {
      type: Object as PropType<IForm>,
      required: true,
    },
  },
});
</script>
