<template>
  <el-table :data="form.fieldValues">
    <el-table-column label="Наименование" sortable>
      <template #default="scope">
        {{ scope.row.field.name }}
      </template>
    </el-table-column>
    <el-table-column label="Данные" sortable>
      <template #default="scope">
        <div v-if="scope.row.field.valueType.isString() || scope.row.field.valueType.isText()">
          {{ scope.row.valueString }}
        </div>
        <div v-else-if="scope.row.field.valueType.isNumber()">
          {{ scope.row.valueNumber }}
        </div>
        <div v-else-if="scope.row.field.valueType.isDate() && scope.row.valueDate">
          {{ $dateTimeFormatter.format(scope.row.valueDate) }}
        </div>
        <div v-else-if="scope.row.field.valueType.isDateTime() && scope.row.valueDate">
          {{ $dateTimeFormatter.format(scope.row.valueDate, { month: 'long', hour: 'numeric', minute: 'numeric' }) }}
        </div>
        <a
          v-else-if="scope.row.field.valueType.isFile() && scope.row.file.fileSystemPath"
          :href="scope.row.file.getFileUrl()"
          target="_blank"
        >
          {{ scope.row.file.originalName }}
        </a>
        <div v-else-if="scope.row.field.valueType.isFiles()">
          <div v-for="fieldValueFile in scope.row.fieldValuesFiles" :key="fieldValueFile">
            <a v-if="fieldValueFile.fileInfo.fileSystemPath" :href="fieldValueFile.fileInfo.getFileUrl()" target="_blank">
              {{ fieldValueFile.fileInfo.originalName }}
            </a>
          </div>
        </div>

        <span v-else>Не продоставлены</span>
      </template>
    </el-table-column>
    <el-table-column label="Является обязательным" width="130px" align="center">
      <template #default="scope">
        <i v-if="scope.row.field.required" class="el-icon-check"></i>
        <i v-else class="el-icon-close"></i>
      </template>
    </el-table-column>
    <el-table-column label="Данные верны" width="100px" align="center">
      <template #default="scope">
        <el-checkbox v-model="scope.row.modChecked" @change="changeModCheckedHandler(scope.row)"></el-checkbox>
      </template>
    </el-table-column>
    <el-table-column label="Замечания" width="400px" align="start">
      <template #default="scope">
        <div v-if="scope.row.modChecked">{{ scope.row.modComment }}</div>
        <el-input v-else v-model="scope.row.modComment" type="textarea" placeholder="Замечания" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IFieldValue from '@/interfaces/IFieldValue';
import IForm from '@/interfaces/IForm';

export default defineComponent({
  name: 'FieldValuesFormResult',
  props: {
    form: {
      type: Object as PropType<IForm>,
      required: true,
    },
  },

  setup() {
    const changeModCheckedHandler = (fieldValue: IFieldValue) => {
      if (fieldValue.modChecked) {
        fieldValue.modComment = '';
      }
    };
    return { changeModCheckedHandler };
  },
});
</script>
