<template>
  <el-form-item v-if="field.valueType.isString()" style="margin: 0">
    <el-input v-model="fieldValue.valueString" :placeholder="field.name" />
    <div v-if="fieldValue.showError && !fieldValue.valueString" class="form-item-error">{{ fieldValue.errorText }}</div>
  </el-form-item>
  <el-form-item v-else-if="field.valueType.isNumber()" style="margin: 0">
    <el-input-number v-model="fieldValue.valueNumber" />
    <div v-if="fieldValue.showError && !fieldValue.valueNumber" class="form-item-error">{{ fieldValue.errorText }}</div>
  </el-form-item>
  <el-form-item v-else-if="field.valueType.isDate()" style="margin: 0">
    <el-date-picker v-model="fieldValue.valueDate" :default-value="new Date()" format="DD.MM.YYYY" />
    <div v-if="fieldValue.showError && !fieldValue.valueDate" class="form-item-error">{{ fieldValue.errorText }}</div>
  </el-form-item>
  <el-form-item v-else-if="field.valueType.isDateTime()" style="margin: 0">
    <el-date-picker v-model="fieldValue.valueDate" type="datetime" :default-value="new Date()" />
    <div v-if="fieldValue.showError && !fieldValue.valueDate" class="form-item-error">{{ fieldValue.errorText }}</div>
  </el-form-item>
  <el-form-item v-else-if="field.valueType.isText()" style="margin: 0">
    <el-input v-model="fieldValue.valueString" type="textarea" :placeholder="field.name" />
    <div v-if="fieldValue.showError && !fieldValue.valueString" class="form-item-error">{{ fieldValue.errorText }}</div>
  </el-form-item>
  <el-form-item v-else-if="field.valueType.isFile()" style="margin: 0">
    <FileUploader v-if="fieldValue.file" :file-info="fieldValue.file" />
    <div v-if="fieldValue.showError && fieldValue.file && !fieldValue.file.fileSystemPath" class="form-item-error">
      {{ fieldValue.errorText }}
    </div>
  </el-form-item>
  <el-form-item v-else-if="field.valueType.isFiles()" style="margin: 0">
    <el-button
      style="margin-bottom: 5px"
      size="mini"
      type="success"
      icon="el-icon-document-add"
      @click="fieldValue.addFieldValueFile()"
    ></el-button>
    <div v-for="(fieldValueFile, i) in fieldValue.fieldValuesFiles" :key="fieldValueFile.id" style="display: flex; margin-bottom: 5px">
      <FileUploader :file-info="fieldValueFile.fileInfo" />
      <el-button
        size="mini"
        icon="el-icon-document-delete"
        style="padding: 5px; margin: 0; min-height: unset; border: none"
        @click="removeFromClass(i, fieldValue.fieldValuesFiles, fieldValue.fieldValuesFilesForDelete)"
      ></el-button>
    </div>
    <div v-if="fieldValue.showError && fieldValue.file && !fieldValue.file.fileSystemPath" class="form-item-error">
      {{ fieldValue.errorText }}
    </div>
  </el-form-item>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import FieldValue from '@/classes/FieldValue';
import FileUploader from '@/components/FileUploader.vue';
import IField from '@/interfaces/IField';
import IFieldValue from '@/interfaces/IFieldValue';
import IForm from '@/interfaces/IForm';
import removeFromClass from '@/mixins/removeFromClass';

export default defineComponent({
  name: 'FieldValuesFormItem',
  components: { FileUploader },
  props: {
    field: {
      type: Object as PropType<IField>,
      required: true,
    },
    form: {
      type: Object as PropType<IForm>,
      required: true,
    },
  },
  setup(props) {
    const fieldValue: Ref<IFieldValue> = ref(new FieldValue());
    onBeforeMount(() => {
      if (props.field.id) {
        fieldValue.value = props.form.findFieldValue(props.field.id) || new FieldValue();
      }
    });

    return {
      fieldValue,
      removeFromClass,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-form-item__content) {
  line-height: 1.3;
}
.form-item-error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
}
</style>
