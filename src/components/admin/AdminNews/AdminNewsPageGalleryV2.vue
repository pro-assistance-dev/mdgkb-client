<template>
  <el-card class="gallery">
    <template #header>
      <div class="card-header">Галерея</div>
    </template>
    <el-upload
      action="#"
      :multiple="false"
      :auto-upload="false"
      :file-list="fileList"
      list-type="picture"
      :on-change="toggleUpload"
      accept="image/jpeg,image/png,image/jng"
    >
      <el-button type="primary">Добавить</el-button>
      <template #file="{ file }">
        <div style="display: flex">
          <img class="el-upload-list__item-thumbnail" :src="file.fileInfo.getImageUrl()" :alt="file.fileInfo.originalName" />
          <el-input
            v-model="file.description"
            style="margin-left: 5px"
            type="textarea"
            size="mini"
            placeholder="Описание"
            @change="() => descriptionChangeHandler(file)"
          ></el-input>
        </div>
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <!-- <span class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span> -->
        </span>
      </template>
    </el-upload>
  </el-card>
</template>

<script lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

import Cropper from '@/classes/cropper/Cropper';
import IFile from '@/interfaces/files/IFile';
import INewsImage from '@/interfaces/news/INewsImage';

export default defineComponent({
  name: 'AdminNewsPage',
  setup() {
    const store = useStore();
    // const fileList = computed(() => store.getters[`news/galleryList`]);
    const fileList = computed(() => store.getters[`news/galleryListV2`]);

    const descriptionChangeHandler = (file: INewsImage) => {
      store.commit('news/updateGalleryImageDescription', file);
    };

    const openCropper = (file: IFile) => {
      store.commit('cropper/open', Cropper.CreateCropper(file.url, 'news', 'saveFromCropperGallery', 8 / 3.3));
    };

    const openCropperV2 = (file: INewsImage) => {
      if (file.fileInfo?.getImageUrl()) {
        store.commit('cropper/open', Cropper.CreateCropper(file.fileInfo.getImageUrl(), 'news', 'saveFromCropperGallery', 8 / 3.3));
      }
    };

    const toggleUpload = (file: IFile) => {
      store.commit('news/pushToNewsImages', file);
      store.commit('news/setCurGalleryCropIndex', fileList.value.length);
      openCropper(file);
    };

    const handlePictureCardPreview = (file: INewsImage) => {
      // const index = fileList.value.findIndex((f: IFilesList) => f.name === file.name);
      const index = fileList.value.findIndex((item: INewsImage) => item.fileInfo?.originalName === file.fileInfo?.originalName);
      if (index > -1) store.commit('news/setCurGalleryCropIndex', index);
      openCropperV2(file);
    };

    const handleRemove = (file: IFile) => {
      store.commit('news/removeFromGallery', file);
    };

    return {
      handlePictureCardPreview,
      fileList,
      toggleUpload,
      handleRemove,
      descriptionChangeHandler,
    };
  },
});
</script>

<style lang="scss" scoped>
$news-content-max-width: 400px;
$news-content-max-height: 165px;

:deep(.el-upload-list__item-thumbnail) {
  width: $news-content-max-width !important;
  height: $news-content-max-height !important;
}
:deep(.el-upload-list__item) {
  height: auto !important;
}
:deep(.el-upload-list__item) {
  transition: unset;
}
</style>
