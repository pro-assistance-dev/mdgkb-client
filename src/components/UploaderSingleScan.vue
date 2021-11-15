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
  <ImageCropperV2 v-if="withCrop" :open="cropperOpened" @crop="crop" @close="cropperOpened = false" />
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
    withCrop: {
      type: Boolean,
      default: true,
    },
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
    const cropperOpened = ref(false);
    let uploader = ref();

    const toggleUpload = (file: IFile) => {
      showUpload.value = !showUpload.value;
      props.fileInfo.uploadNewFile(file);
      fileList.value = [];
      if (props.fileInfo.fileSystemPath) {
        fileList.value.push({ name: props.fileInfo.fileSystemPath, url: file.url });
      }
      if (props.withCrop) {
        openCropper(file);
      }
    };

    const openCropper = (file: IFile) => {
      store.commit('cropper/openV2', Cropper.CreateCropperV2(file.url, 1, props.fileInfo.id));
      cropperOpened.value = true;
    };

    const handleRemove = () => {
      uploader.value.clearFiles();
      showUpload.value = !showUpload.value;
    };

    const crop = (file: IFile) => {
      props.fileInfo.setFile(file);
      fileList.value = [];
      if (props.fileInfo.fileSystemPath) {
        fileList.value.push({ name: props.fileInfo.fileSystemPath, url: file.src });
      }
      showUpload.value = false;
      cropperOpened.value = false;
    };

    return {
      cropperOpened,
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
