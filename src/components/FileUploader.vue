<template>
  <el-upload
    :on-change="changeFileHandler"
    action="#"
    :auto-upload="false"
    class="upload-container"
    :show-file-list="false"
    list-type="picture"
    accept=".pdf, .jpeg, .jpg"
  >
    <el-button size="mini" type="success">{{ fileInfo && fileInfo.originalName ? 'Обновить' : 'Загрузить' }}</el-button>
    <template #tip>
      <div v-if="fileInfo && fileInfo.originalName" class="file-name">
        <a :href="fileInfo.getFileUrl()" target="_blank" :download="fileInfo.originalName">
          <div>{{ fileInfo.originalName }}</div>
        </a>
        <el-button size="mini" icon="el-icon-close" @click="removeFile"></el-button>
      </div>
      <div v-else class="file-name">Файл не загружен</div>
    </template>
  </el-upload>
</template>

<script lang="ts">
import { ElNotification } from 'element-plus';
import { defineComponent, PropType } from 'vue';

import IFile from '@/interfaces/files/IFile';
import IFileInfo from '@/interfaces/files/IFileInfo';
import getExtension from '@/services/GetExtension';

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
      if (!isAcceptedFormat(file.name)) {
        ElNotification.error({
          message: 'Загруженный файл должен быть в формате pdf, jpg или jpeg',
        });
        return;
      }
      props.fileInfo.uploadAndSetFile(file);
    };
    const removeFile = () => {
      props.fileInfo.clearFile();
    };

    function isAcceptedFormat(filename: string): boolean {
      let ext = getExtension(filename);
      switch (ext.toLowerCase()) {
        case 'pdf':
        case 'jpg':
        case 'jpeg':
          return true;
      }
      return false;
    }

    return {
      changeFileHandler,
      removeFile,
    };
  },
});
</script>

<style lang="scss" scoped>
.file-name {
  margin-left: 5px;
  display: flex;
  align-items: center;
  a {
    line-height: 1.1;
  }
  .el-button {
    margin-left: 2px;
    padding: 5px;
    margin: 0;
    min-height: unset;
    border: none;
  }
}
.upload-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

@media screen and (max-width: 1280px) {
  .upload-container {
    display: block;
  }
}

@media screen and (max-width: 1200px) {
  .upload-container {
    display: flex;
  }
}

// @media screen and (max-width: 1024px) {
//   .upload-container {
//     display: block;
//   }
// }
</style>
