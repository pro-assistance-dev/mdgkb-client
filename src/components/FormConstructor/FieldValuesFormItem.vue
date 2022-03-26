<template>
  <el-form-item v-if="field.valueType.isString()" style="margin: 0">
    <el-input v-model="fieldValue.valueString" :placeholder="field.name" />
    <span v-if="fieldValue.showError && !fieldValue.valueString" class="form-item-error">{{ fieldValue.errorText }}</span>
  </el-form-item>
  <el-form-item v-if="field.valueType.isNumber()" style="margin: 0">
    <el-input-number v-model="fieldValue.valueNumber" />
    <span v-if="fieldValue.showError && !fieldValue.valueNumber" class="form-item-error">{{ fieldValue.errorText }}</span>
  </el-form-item>
  <el-form-item v-if="field.valueType.isDate()" style="margin: 0" :placeholder="field.name">
    <el-date-picker v-model="fieldValue.valueDate" />
    <span v-if="fieldValue.showError && !fieldValue.valueDate" class="form-item-error">{{ fieldValue.errorText }}</span>
  </el-form-item>
  <el-form-item v-if="field.valueType.isText()" style="margin: 0" :placeholder="field.name">
    <el-input v-model="fieldValue.valueString" type="textarea" />
    <span v-if="fieldValue.showError && !fieldValue.valueString" class="form-item-error">{{ fieldValue.errorText }}</span>
  </el-form-item>
  <el-form-item v-if="field.valueType.isFile()" style="margin: 0">
    <FileUploader :file-info="fieldValue.file" />
    <span v-if="fieldValue.showError && !fieldValue.file.fileSystemPath" class="form-item-error">{{ fieldValue.errorText }}</span>
  </el-form-item>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import FileUploader from '@/components/FileUploader.vue';
import IField from '@/interfaces/IField';
import IFieldValue from '@/interfaces/IFieldValue';
import IForm from '@/interfaces/IForm';

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
    const fieldValue: Ref<IFieldValue | undefined> = ref();

    onBeforeMount(() => {
      if (props.field.id) {
        fieldValue.value = props.form.findFieldValue(props.field.id);
      }
    });

    return {
      fieldValue,
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
  // position: absolute;
  // top: 100%;
  // bottom: 0;
  // left: 0;
}
</style>
