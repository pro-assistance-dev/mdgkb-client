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
      <div class="div1">
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
  <ImageCropperV2New v-if="withCrop" :open="cropperOpened" :default-ratio="defaultRatio" @crop="crop" @close="cropperOpened = false" />
</template>

<script lang="ts">
import { ElMessageBox } from 'element-plus';
import { computed, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import Cropper from '@/classes/Cropper';
import ImageCropperV2New from '@/components/ImageCropperV2_new.vue';
import IFile from '@/interfaces/files/IFile';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IFilesList from '@/interfaces/files/IFIlesList';

export default defineComponent({
  name: 'UploaderSingleScan',
  components: {
    ImageCropperV2New,
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
      default: 150,
    },
    width: {
      type: Number,
      default: 150,
    },
    cropRatio: {
      type: Boolean,
      default: true,
    },
    emitCrop: {
      type: Boolean,
      default: false,
    },
    defaultRatio: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  emits: ['crop', 'removeFile'],

  setup(props, { emit }) {
    const fileList: Ref<IFilesList[]> = ref([]);
    const heightWeight = computed(() => {
      return {
        '--height': `${props.height}px`,
        '--width': `auto`,
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
      const ratio = props.cropRatio ? props.defaultRatio : 0;
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
.avatar-uploader-cover {
  display: flex;
  justify-content: center;
}

.avatar-uploader-cover.hideUploader {
  display: flex;
  justify-content: center;
  height: var(--height);
  text-align: center;
  margin: 0;
}

:deep(.el-upload) {
  max-height: var(--height);
  height: 100% !important;
  width: auto !important;
  background: white;
  text-align: center;
  line-height: var(--height);
}

:deep(.el-upload-list__item) {
  width: auto !important;
  max-height: var(--height) !important;
  height: 100% !important;
  margin: 0px;
}

:deep(.el-upload-list__item-thumbnail) {
  width: auto !important;
  max-height: var(--height) !important ;
  height: 100% !important;
}

:deep(.el-upload-list--picture-card) {
  display: flex;
  justify-content: center;
}

:deep(.el-upload-list--picture-card .el-upload-list__item) {
  margin: 10px;
}

:deep(.el-upload-list__item) {
  transition: unset;
}

.flex-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.div1 {
  display: flex;
  justify-content: center;
  width: auto;
}

:deep(.el-upload--picture-card) {
  width: 150px;
  font-size: 50px;
  margin: 10px;
}

:deep(.el-upload--picture-card i) {
  font-size: 50px;
  color: #00b5a4;
  padding: 0 54px;
}
</style>
