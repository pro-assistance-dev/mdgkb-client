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
import { ElMessageBox } from 'element-plus';
import { computed, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';
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
      type: Number,
      default: 100,
    },
    width: {
      type: Number,
      default: 100,
    },
    cropRatio: {
      type: Boolean,
      default: true,
    },
    emitCrop: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['crop', 'removeFile'],

  setup(props, { emit }) {
    const fileList: Ref<IFilesList[]> = ref([]);
    const heightWeight = computed(() => {
      return {
        '--height': `${props.height}px`,
        '--width': `${props.width}px`,
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
      const ratio = props.cropRatio ? props.width / props.height : 0;
      store.commit('cropper/openV2', Cropper.CreateCropperV2(file.url, ratio, props.fileInfo.id));
      cropperOpened.value = true;
    };

    const handleRemove = () => {
      ElMessageBox.confirm('Вы уверены?', 'Вы хотите удалить изображение', {
        distinguishCancelAndClose: true,
        confirmButtonText: 'Удалить',
        cancelButtonText: 'Не удалять',
      })
        .then(() => {
          uploader.value.clearFiles();
          showUpload.value = !showUpload.value;
          emit('removeFile');
        })
        .catch(() => {
          return;
        });
    };

    const crop = (file: IFile) => {
      props.fileInfo.setFile(file);
      fileList.value = [];
      if (props.fileInfo.fileSystemPath) {
        fileList.value.push({ name: props.fileInfo.fileSystemPath, url: file.src });
      }
      showUpload.value = false;
      cropperOpened.value = false;
      if (props.emitCrop) {
        emit('crop');
      }
    };

    onBeforeMount(() => {
      if (props.fileInfo.fileSystemPath) {
        fileList.value.push({ name: props.fileInfo.fileSystemPath, url: props.fileInfo.getImageUrl() });
        showUpload.value = false;
      }
    });

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

// .avatar-uploader-cover {
// line-height: var(--height);
// text-align: center;
// }

// .custom-plus {
//display: inline-block;
//vertical-align: middle;
//line-height: normal;
// }

:deep(.el-upload) {
  max-width: var(--width);
  width: 100% !important;
  max-height: var(--height);
  height: 100% !important;
  background: white;
  text-align: center;
  line-height: var(--height);
}

:deep(.el-upload-list__item) {
  max-width: var(--width) !important;
  width: 100% !important;
  max-height: var(--height) !important;
  height: 100% !important;
}

:deep(.el-upload-list__item-thumbnail) {
  max-width: var(--width) !important;
  width: 100% !important;
  max-height: var(--height) !important ;
  height: 100% !important;
}

:deep(.el-upload-list__item) {
  transition: unset;
}

.flex-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
