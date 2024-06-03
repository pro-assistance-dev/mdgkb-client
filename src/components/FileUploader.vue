<template>
  <el-upload :on-change="changeFileHandler" action="#" :auto-upload="false" class="upload-container"
    :show-file-list="false" list-type="picture" :accept="accept">
    <PButton skin="text" type="success" :text="fileInfo && fileInfo.originalName ? 'Обновить' : 'Загрузить'"
      margin="0 0 2px 0" />
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
import { defineComponent, PropType, ref } from 'vue';

import FileInfo from '@/services/classes/FileInfo.ts';
import IFile from '@/interfaces/files/IFile';
import getExtension from '@/services/GetExtension';

export default defineComponent({
  name: 'FileUploader',
  props: {
    fileInfo: {
      type: Object as PropType<FileInfo>,
      required: true,
    },
    formats: {
      type: Array as PropType<string[]>,
      default: () => ['pdf', 'jpeg', 'jpg'],
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
    const accept = ref(props.formats.map((el) => '.' + el).toString());

    function isAcceptedFormat(filename: string): boolean {
      let ext = getExtension(filename);
      if (props.formats.includes(ext.toLowerCase())) {
        return true;
      }
      // switch (ext.toLowerCase()) {
      //   case 'pdf':
      //   case 'jpg':
      //   case 'jpeg':
      //   case 'webm':
      //   case 'mp4':
      //     return true;
      // }
      return false;
    }

    return {
      changeFileHandler,
      removeFile,
      accept,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

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
// }</style>
