<template>
  <el-card class="gallery">
    <template #header> Галерея </template>
    <el-upload
      ref="uploader"
      :multiple="false"
      class="avatar-uploader"
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :auto-upload="false"
      :on-change="toggleUpload"
      accept="image/jpeg,image/png,image/jng"
    >
      <template #default>
        <i class="el-icon-plus"></i>
      </template>
      <template #file="{ file }">
        <div>
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        </div>
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="$emit('handlePictureCardPreview', file, 'gallery')">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span class="el-upload-list__item-delete" @click="$emit('handleRemove', file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </template>
    </el-upload>
  </el-card>
</template>

<script lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { defineComponent, PropType } from 'vue';
import { useStore } from 'vuex';

import FileInfo from '@/classes/File/FileInfo';
import IFilesList from '@/interfaces/files/IFIlesList';

export default defineComponent({
  name: 'AdminNewsPage',
  props: {
    fileList: {
      type: Object as PropType<IFilesList[]>,
      required: true,
    },
    fileInfo: {
      type: Object as PropType<FileInfo>,
      required: true,
    },
  },
  emits: ['toggleUpload', 'handleRemove', 'handlePictureCardPreview'],
  setup(props, { emit }) {
    const store = useStore();
    const toggleUpload = (file: any) => {
      store.commit('news/pushToNewsImages', file);
      emit('toggleUpload', file.url, 'gallery');
    };

    return {
      toggleUpload,
    };
  },
});
</script>

<style lang="scss" scoped>
.gallery {
  width: 100%;
  text-align: center;
}

$news-content-max-width: 800px;
$news-content-max-height: 330px;

.hideUpload {
  :deep(.el-upload) {
    display: none;
  }
}

.avatar-uploader-cover {
  height: 300px;
  text-align: center;
  align-content: center;
}

.custom-plus {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

:deep(.el-upload) {
  width: $news-content-max-width;
  height: $news-content-max-height;
  background: white;
  text-align: center;
  line-height: $news-content-max-height;
}

:deep(.el-upload-list__item) {
  width: $news-content-max-width !important;
  height: $news-content-max-height !important;
}

:deep(.el-upload-list__item-thumbnail) {
  width: $news-content-max-width !important;
  height: $news-content-max-height !important;
}
</style>
