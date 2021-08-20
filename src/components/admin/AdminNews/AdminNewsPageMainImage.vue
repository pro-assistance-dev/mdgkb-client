<template>
  <el-card>
    <template #header> Основное изображение </template>
    <el-upload
      ref="uploader"
      :multiple="false"
      class="avatar-uploader-cover"
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :auto-upload="false"
      :limit="parseInt('1')"
      :on-change="toggleUpload"
      :class="{ hideUpload: !showUpload }"
      accept="image/jpeg,image/png,image/jng"
    >
      <template #default>
        <i class="el-icon-plus custom-plus"></i>
      </template>
      <template #file="{ file }">
        <div>
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        </div>
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="$emit('handlePictureCardPreview', file, 'main')">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </template>
    </el-upload>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

import Cropper from '@/classes/cropper/Cropper';
import FileInfo from '@/classes/File/FileInfo';
import IFile from '@/interfaces/files/IFile';

export default defineComponent({
  name: 'AdminNewsPageMainImage',
  emits: ['toggleUpload', 'handlePictureCardPreview'],
  setup() {
    const store = useStore();
    let uploader = ref();
    const fileList = computed(() => store.getters[`news/mainImageList`]);
    const fileInfo = computed(() => store.getters[`news/mainImageFileInfo`]);
    let showUpload = ref(fileList.value.length === 0);

    const toggleUpload = (file: IFile) => {
      showUpload.value = !showUpload.value;
      store.commit('news/setMainImage', FileInfo.CreatePreviewFile(file, 'main'));
      store.commit('cropper/open', Cropper.CreateCropper(file.url, 'news', 'saveFromCropperMain', 2));
    };

    const handleRemove = () => {
      uploader.value.clearFiles();
      setTimeout(() => {
        showUpload.value = !showUpload.value;
      }, 800);
    };

    return {
      fileInfo,
      fileList,
      uploader,
      handleRemove,
      showUpload,
      toggleUpload,
    };
  },
});
</script>

<style lang="scss" scoped>
$news-content-max-width: 400px;
$news-content-max-height: $news-content-max-width / 2;

.hideUpload {
  :deep(.el-upload) {
    display: none;
  }
}

.avatar-uploader-cover {
  // height: 400px;
  text-align: center;
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
