<template>
  <div v-for="field in formValue.getRequiredForCancelFields()" :key="field.id">
    <div>
      <b>Скачайте и заполните форму:</b>
      <div>
        <a v-if="field.file.fileSystemPath" :href="field.file.getFileUrl()" target="_blank">
          {{ field.file.originalName }}
        </a>
      </div>
    </div>
    <div style="margin-top: 10px">
      <span><b> Загрузите заполненную форму: </b></span
      ><span><FileUploader v-if="formValue.findFieldValue(field.id).file" :file-info="formValue.findFieldValue(field.id).file" /> </span>
    </div>

    <div class="text-align-right margin-top-1">
      <el-button @click="$emit('closeDialog')">Отмена</el-button>
      <el-button v-if="formValue.findFieldValue(field.id).file.fileSystemPath" type="primary" @click="$emit('cancelApplication')">
        Отозвать заявку
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import FileUploader from '@/components/FileUploader.vue';
import IForm from '@/interfaces/IForm';
export default defineComponent({
  name: 'CancelDialogForm',
  components: { FileUploader },
  emits: ['cancelApplication', 'closeDialog'],
  props: {
    formValue: {
      type: Object as PropType<IForm>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.text-align-right {
  text-align: right;
}

.margin-top-1 {
  margin-top: 1rem;
}
</style>
