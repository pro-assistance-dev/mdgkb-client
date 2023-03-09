<template>
  <el-upload
    :on-change="(e) => document.uploadScan(e)"
    action="#"
    :auto-upload="false"
    class="upload-container"
    :show-file-list="false"
    list-type="picture"
  >
    <el-button size="mini" type="success">{{ document.scan.id ? 'Обновить' : 'Загрузить' }}</el-button>
    <template #tip>
      <div v-if="document.scan" class="file-name">
        <a :href="document?.scan.getFileUrl()" target="_blank">
          {{ document.scan?.originalName }}
        </a>
      </div>
      <div v-else class="file-name">Файл не загружен</div>
    </template>
  </el-upload>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import PageSectionDocument from '@/services/classes/page/PageSectionDocument';

export default defineComponent({
  name: 'DocumentUploader',
  props: {
    document: {
      type: Object as PropType<PageSectionDocument>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.file-name {
  margin-left: 5px;
}
.upload-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
