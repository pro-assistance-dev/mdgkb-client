<template>
  <div v-if="fieldValue" prop="primaryAccreditationPoints">
    <div style="margin-bottom: 5px">
      <span v-if="required" class="red">*&nbsp;</span>
      {{ fieldValue?.field?.name }}
    </div>
    <div v-if="fieldValue?.field?.file.fileSystemPath">
      <span>Образец: </span>
      <a v-if="fieldValue?.field.file.fileSystemPath" :href="fieldValue?.field.file.getFileUrl()" target="_blank">
        {{ fieldValue?.field.file.originalName }}
      </a>
    </div>
    <span>
      <FileUploader :file-info="fieldValue?.file" />
      <div v-if="showError && fieldValue.file && !fieldValue.file.fileSystemPath" class="form-item-error">
        {{ fieldValue.errorText }}
      </div>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import FileUploader from '@/components/FileUploader.vue';
import IFieldValue from '@/interfaces/IFieldValue';

export default defineComponent({
  name: 'FieldValueFile',
  components: { FileUploader },
  props: {
    fieldValue: {
      type: Object as PropType<IFieldValue | undefined>,
      required: true,
    },
    showError: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.form-item-error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
}
.red {
  color: red;
}
:deep(.el-form-item) {
  background-color: #f9fafb;
  border: 1px solid #e9e9e9;
  border-radius: 5px;
  padding: 16px;
}
</style>
