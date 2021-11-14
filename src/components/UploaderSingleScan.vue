<template>
  <el-upload
    ref="uploader"
    :multiple="false"
    action="#"
    list-type="picture-card"
    class="avatar-uploader-cover"
    :auto-upload="false"
    :limit="parseInt('1')"
    :file-list="fileList"
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
  <ImageCropperV2 @crop.self="crop" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import Cropper from '@/classes/cropper/Cropper';
import ImageCropperV2 from '@/components/ImageCropperV2.vue';
import IFile from '@/interfaces/files/IFile';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IFilesList from '@/interfaces/files/IFIlesList';

export default defineComponent({
  name: 'UploaderSingleScan',
  components: {
    ImageCropperV2,
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
    const fileList: Ref<IFilesList[]> = ref([]);
    const heightWeight = computed(() => {
      return {
        '--height': props.height,
        '--width': props.width,
      };
    });
    const store = useStore();
    let showUpload = ref(fileList.value.length === 0);
    let uploader = ref();

    const openCropper = (file: IFile) => {
      store.commit('cropper/openV2', Cropper.CreateCropperV2(file.url, 1, props.fileInfo.id));
    };

    const toggleUpload = (file: IFile) => {
      showUpload.value = !showUpload.value;
      console.log(props.fileInfo);
      props.fileInfo.uploadNewFile(file);
      console.log(props.fileInfo);
      openCropper(file);
    };

    const handleRemove = () => {
      uploader.value.clearFiles();
      showUpload.value = !showUpload.value;
      // store.commit(`${storeModule.value}/${removeFileMutation.value}`);
    };

    const crop = (file: IFile, id: string) => {
      fileList.value = [];
      console.log(id, props.fileInfo);
      // if (id === props.fileInfo.id) {
      props.fileInfo.setFile(file.blob);
      // if (props.fileInfo.fileSystemPath) {
      fileList.value.push({ name: props.fileInfo.fileSystemPath ?? 'asdfasd', url: file.src });
      showUpload.value = false;
      // }
      // }
    };

    return {
      crop,
      openCropper,
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
