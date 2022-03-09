<template>
  <el-upload
    :on-change="changeFileHandler"
    action="#"
    :auto-upload="false"
    accept="application/pdf"
    class="upload-container"
    :show-file-list="false"
    list-type="picture"
  >
    <el-button size="mini" type="success">{{ fileInfo.originalName ? 'Обновить' : 'Загрузить' }}</el-button>
    <template #tip>
      <div v-if="fileInfo.originalName" class="file-name">
        <a :href="fileInfo.url" target="_blank">
          {{ fileInfo.originalName }}
        </a>
      </div>
      <div v-else class="file-name">Файл не загружен</div>
    </template>
  </el-upload>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IFile from '@/interfaces/files/IFile';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default defineComponent({
  name: 'FileUploader',
  props: {
    fileInfo: {
      type: Object as PropType<IFileInfo>,
      required: true,
    },
  },

  setup(props) {
    const changeFileHandler = (file: IFile) => {
      console.log(file.url);
      props.fileInfo.uploadAndSetFile(file);
    };

    return {
      changeFileHandler,
    };
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
