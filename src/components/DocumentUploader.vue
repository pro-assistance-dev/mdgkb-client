<template>
  <el-upload
    :on-change="changeFileHandler"
    action="#"
    :auto-upload="false"
    class="upload-container"
    :show-file-list="false"
    list-type="picture"
  >
    <el-button size="mini" type="success">{{ document.documentsScans.length ? 'Обновить' : 'Загрузить' }}</el-button>
    <template #tip>
      <div v-if="document.documentsScans[0]?.scan" class="file-name">
        <a :href="document?.documentsScans[0]?.scan.getFileUrl()" target="_blank">
          {{ document.documentsScans[0]?.scan?.originalName }}
        </a>
      </div>
      <div v-else class="file-name">Файл не загружен</div>
    </template>
  </el-upload>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useStore } from 'vuex';

import IDocument from '@/interfaces/document/IDocument';
import IFile from '@/interfaces/files/IFile';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default defineComponent({
  name: 'DocumentUploader',
  props: {
    document: {
      type: Object as PropType<IDocument>,
      required: true,
    },
  },

  setup(props) {
    const store = useStore();

    const changeFileHandler = (file: IFile) => {
      if (props.document.documentsScans.length) {
        const fileForDelete = props.document.deleteScan();
        store.commit('publicDocumentTypes/updateFileInfo', fileForDelete);
      }
      const newScan: IFileInfo = props.document.uploadScan(file);
      store.commit('publicDocumentTypes/addFileInfo', newScan);
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
