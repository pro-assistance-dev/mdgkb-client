<template>
  <el-card>
    <template #header> Загрузить баннер </template>
    <el-upload
      ref="uploader"
      :multiple="false"
      action="#"
      list-type="picture-card"
      class="avatar-uploader-cover"
      :file-list="fileList"
      :auto-upload="false"
      :limit="parseInt('1')"
      :on-change="toggleUpload"
      :class="{ hideUpload: !showUpload }"
      accept="image/jpeg,image/png,image/jng,image/gif"
    >
      <template #default>
        <i class="el-icon-plus custom-plus"></i>
      </template>
      <template #file="{ file }">
        <div>
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        </div>
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="openCropper(file)">
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
  name: 'AdminBannerImage',
  setup() {
    const store = useStore();
    const fileList = computed(() => store.getters[`banners/fileList`]);
    const fileInfo = computed(() => store.getters[`banners/fileInfo`]);

    let showUpload = ref(fileList.value.length === 0);
    let uploader = ref();

    const openCropper = (file: IFile) => {
      store.commit('cropper/open', Cropper.CreateCropper(file.url, 'banners', 'setFile'));
    };
    const toggleUpload = (file: IFile) => {
      showUpload.value = !showUpload.value;
      store.commit('banners/setFileInfo', FileInfo.CreatePreviewFile(file, 'banners', fileInfo.value.id));
      openCropper(file);
    };

    const handleRemove = () => {
      uploader.value.clearFiles();
      setTimeout(() => {
        showUpload.value = !showUpload.value;
      }, 800);
    };

    return {
      openCropper,
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
$content-max-width: 200px;
$content-max-height: $content-max-width;

.hideUpload {
  :deep(.el-upload) {
    display: none;
  }
}

.avatar-uploader-cover {
  height: $content-max-height;
  text-align: center;
}

.custom-plus {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

:deep(.el-upload) {
  width: $content-max-width;
  height: $content-max-height;
  background: white;
  text-align: center;
  line-height: $content-max-height;
}

:deep(.el-upload-list__item) {
  width: $content-max-width !important;
  height: $content-max-height !important;
}

:deep(.el-upload-list__item-thumbnail) {
  width: $content-max-width !important;
  height: $content-max-height !important;
}
</style>
