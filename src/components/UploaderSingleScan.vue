<template>
  <el-upload
    ref="uploader"
    :multiple="false"
    action="#"
    list-type="picture-card"
    class="avatar-uploader-cover"
    :auto-upload="false"
    :limit="1"
    :style="heightWeight"
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
        <span class="el-upload-list__item-preview" @click="openCropper(file)">
          <i class="el-icon-zoom-in"></i>
        </span>
        <span class="el-upload-list__item-delete" @click="handleRemove()">
          <i class="el-icon-delete"></i>
        </span>
      </span>
    </template>
  </el-upload>

  <!--  <ImageCropper />-->
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref } from 'vue';

import IFile from '@/interfaces/files/IFile';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IFilesList from '@/interfaces/files/IFIlesList';

export default defineComponent({
  name: 'UploaderSingleScan',
  components: {
    // ImageCropper,
  },
  props: {
    fileInfo: {
      type: Object as PropType<IFileInfo>,
      required: true,
    },
    height: {
      type: String,
      default: '200px',
    },
    width: {
      type: String,
      default: '200px',
    },
  },
  setup(props) {
    const fileList: Ref<IFilesList[]> = ref([props.fileInfo.getFileListObject()]);
    const heightWeight = computed(() => {
      return {
        '--height': props.height,
        '--width': props.width,
      };
    });

    // let showUpload = ref(fileList.value.length === 0);
    let showUpload = ref(true);
    let uploader = ref();

    // const openCropper = (file: IFile) => {
    //   store.commit('cropper/open', Cropper.CreateCropper(file.url, storeModule.value, setFileListMutation.value, 1));
    // };
    const toggleUpload = (file: IFile) => {
      showUpload.value = !showUpload.value;
      props.fileInfo.uploadNewFile(file);
      // openCropper(file);
    };

    const handleRemove = () => {
      uploader.value.clearFiles();
      showUpload.value = !showUpload.value;
      // store.commit(`${storeModule.value}/${removeFileMutation.value}`);
    };

    return {
      // openCropper,
      heightWeight,
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
.hideUpload {
  :deep(.el-upload) {
    display: none;
  }
}

.avatar-uploader-cover {
  line-height: var(--height);
  text-align: center;
}

.custom-plus {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

:deep(.el-upload) {
  width: var(--width);
  height: var(--height);
  background: white;
  text-align: center;
  line-height: var(--height);
}

:deep(.el-upload-list__item) {
  width: var(--width) !important;
  height: var(--height) !important;
}

:deep(.el-upload-list__item-thumbnail) {
  width: var(--width) !important;
  height: var(--height) !important ;
}

:deep(.el-upload-list__item) {
  transition: unset;
}
</style>
