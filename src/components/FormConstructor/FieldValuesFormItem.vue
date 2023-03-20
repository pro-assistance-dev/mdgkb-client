<template>
  <el-form-item>
    <template v-if="showLabel" #label>
      <div style="margin-left: 10px">
        <div style="margin-bottom: 5px">
          <span v-if="field.required" class="red">*</span>
          {{ field.name }}
        </div>
        <div v-if="field.comment" style="margin-bottom: 5px">
          <i>{{ field.comment }}</i>
        </div>
        <div v-if="showModComments" style="margin-bottom: 5px">
          <i style="color: red">{{ fieldValue?.modComment }}</i>
        </div>
        <div v-if="field.file.fileSystemPath">
          <span>Образец: </span>
          <a v-if="field.file.fileSystemPath" :href="field.file.getFileUrl()" target="_blank">
            {{ field.file.originalName }}
          </a>
        </div>
      </div>
    </template>
    <div v-if="field.valueType.isString()">
      <el-input
        v-if="field.mask"
        v-model="fieldValue.valueString"
        v-maska="{ mask: field.mask, tokens: field.getMaskTokens() }"
        :placeholder="field.name"
      />
      <el-input v-else v-model="fieldValue.valueString" :placeholder="field.name" />
      <div v-if="fieldValue.showError && !fieldValue.valueString" class="form-item-error">
        {{ fieldValue.errorText }}
      </div>
    </div>
    <div v-else-if="field.valueType.isNumber()">
      <el-input-number v-model="fieldValue.valueNumber" />
      <div v-if="fieldValue.showError && !fieldValue.valueNumber" class="form-item-error">
        {{ fieldValue.errorText }}
      </div>
    </div>
    <div v-else-if="field.valueType.isDate()">
      <el-date-picker v-model="fieldValue.valueDate" :default-value="new Date()" format="DD.MM.YYYY" />
      <div v-if="fieldValue.showError && !fieldValue.valueDate" class="form-item-error">
        {{ fieldValue.errorText }}
      </div>
    </div>
    <div v-else-if="field.valueType.isDateTime()">
      <el-date-picker v-model="fieldValue.valueDate" type="datetime" :default-value="new Date()" />
      <div v-if="fieldValue.showError && !fieldValue.valueDate" class="form-item-error">
        {{ fieldValue.errorText }}
      </div>
    </div>
    <div v-else-if="field.valueType.isText()">
      <el-input v-model="fieldValue.valueString" type="textarea" :placeholder="field.name" />
      <div v-if="fieldValue.showError && !fieldValue.valueString" class="form-item-error">
        {{ fieldValue.errorText }}
      </div>
    </div>
    <div v-else-if="field.valueType.isFile()">
      <FileUploader v-if="fieldValue.file" :file-info="fieldValue.file" />
      <div v-if="fieldValue.showError && fieldValue.file && !fieldValue.file.fileSystemPath" class="form-item-error">
        {{ fieldValue.errorText }}
      </div>
    </div>
    <div v-else-if="field.valueType.isFiles()">
      <el-button
        style="margin-bottom: 5px"
        size="mini"
        type="success"
        icon="el-icon-document-add"
        @click="fieldValue.addFieldValueFile()"
      />
      {{ fieldValue.valueNumber }}
      <div v-for="(fieldValueFile, i) in fieldValue.fieldValuesFiles" :key="fieldValueFile.id" style="display: flex; margin-bottom: 5px">
        <FileUploader :file-info="fieldValueFile.fileInfo" />
        <el-button
          size="mini"
          icon="el-icon-document-delete"
          style="padding: 5px; margin: 0; min-height: unset; border: none"
          @click="$classHelper.RemoveFromClassByIndex(i, fieldValue.fieldValuesFiles, fieldValue.fieldValuesFilesForDelete)"
        />
      </div>
      <div v-if="fieldValue.showError && fieldValue.file && !fieldValue.file.fileSystemPath" class="form-item-error">
        {{ fieldValue.errorText }}
      </div>
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
    showLabel: {
      type: Boolean,
      default: false,
    },
    showModComments: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const fieldValue: Ref<IFieldValue> = ref(new FieldValue());
    onBeforeMount(() => {
      console.log(props.field.id);
      if (props.field.id) {
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
:deep(.el-form-item__content) {
  line-height: 1.3;
}
.form-item-error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
}
:deep(.el-form-item__label) {
  line-height: 1.5;
}
.red {
  color: red;
}
</style>
