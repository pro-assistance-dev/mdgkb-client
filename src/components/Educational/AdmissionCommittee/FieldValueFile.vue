<template>
  <div v-if="fieldValue" prop="primaryAccreditationPoints">
    <div style="margin-bottom: 5px">
      <span v-if="required" class="red">*&nbsp;</span>
      {{ field?.name }}
    </div>
    <div v-if="field?.comment" style="margin-bottom: 5px; line-height: normal">
      <i>{{ field.comment }}</i>
    </div>
    <div v-if="field?.file.fileSystemPath">
      <span>Образец: </span>
      <a v-if="field.file.fileSystemPath" :href="field.file.getFileUrl()" target="_blank">
        {{ field.file.originalName }}
      </a>
    </div>
    <span v-if="fieldValue?.file">
      <FileUploader :file-info="fieldValue?.file" />
      <div v-if="showError && fieldValue.file && !fieldValue.file.fileSystemPath" class="form-item-error">
        {{ fieldValue.errorText }}
      </div>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import FieldValue from '@/classes/FieldValue';
import FileUploader from '@/components/FileUploader.vue';
import IField from '@/interfaces/IField';
import IFieldValue from '@/interfaces/IFieldValue';
import IForm from '@/interfaces/IForm';

export default defineComponent({
  name: 'FieldValueFile',
  components: { FileUploader },
  props: {
    field: {
      type: Object as PropType<IField | undefined>,
      required: true,
    },
    form: {
      type: Object as PropType<IForm>,
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
  setup(props) {
    const fieldValue: Ref<IFieldValue> = ref(new FieldValue());
    onBeforeMount(() => {
      if (props.field?.id) {
        fieldValue.value = props.form.findFieldValue(props.field.id) || new FieldValue();
      }
    });

    return {
      fieldValue,
    };
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
