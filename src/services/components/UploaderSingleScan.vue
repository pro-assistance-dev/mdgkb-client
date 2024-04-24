<template>
  <el-upload ref="uploader" :multiple="false" action="#" list-type="picture-card" class="avatar-uploader-cover"
    :auto-upload="false" :limit="parseInt('1')" :file-list="fileList" :style="heightWeight" :on-change="toggleUpload"
    :class="{ hideUpload: !showUpload }" accept="image/jpeg,image/png,image/jng">
    <template #default>
      <div class="plus-cr" :style="{ width: height * defaultRatio - 2 + 'px', height: height + 'px' }">Добавить</div>
    </template>
    <template #file="{ file }">
      <div class="div1" :style="{ width: height * defaultRatio - 2 + 'px', height: height + 'px' }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="upload-image" />
      </div>
      <div class="el-upload-list__item-actions">
        <div class="inside">
          <div class="b1" @click="openCropper(file)">Изменить</div>
          <div class="b2" @click="handleRemove()">Удалить</div>
        </div>
      </div>
    </template>
  </el-upload>
  <ImageCropper v-if="withCrop" :open="cropperOpened" :default-ratio="defaultRatio" @crop="crop"
    @close="cropperOpened = false" />
</template>

<script lang="ts" setup>
import { ElMessageBox } from 'element-plus';
import { useStore } from 'vuex';

import FileInfo from '@/services/classes/FileInfo';
import IFile from '@/services/interfaces/IFile';
import IFilesList from '@/services/interfaces/IFIlesList';
import Cropper from '@/services/classes/Cropper';
import ImageCropper from '@/services/components/ImageCropper.vue';

const props = defineProps({
  withCrop: {
    type: Boolean,
    default: true,
  },
  fileInfo: {
    type: Object as PropType<FileInfo>,
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
});

const emits = defineEmits(['crop', 'removeFile']);


const fileList: Ref<any[]> = ref([]);
const heightWeight = computed(() => {
  return {
    '--height': `${props.height}px`,
  };
});
const store = useStore();
let showUpload = ref(fileList.value.length === 0);
const cropperOpened = ref(false);
let uploader = ref();

const toggleUpload = (file: any) => {
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

const openCropper = (file: any) => {
  const ratio = props.cropRatio ? props.defaultRatio : 0;
  store.commit('cropper/open', Cropper.CreateCropper(file.url, ratio, props.fileInfo.id));
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
      emits('removeFile');
    })
    .catch(() => {
      return;
    });
};

const crop = (file: any) => {
  props.fileInfo.setFile(file);
  fileList.value = [];
  if (props.fileInfo.fileSystemPath) {
    fileList.value.push({ name: props.fileInfo.fileSystemPath, url: file.src });
  }
  showUpload.value = false;
  cropperOpened.value = false;
  emits('crop');
};

onBeforeMount(() => {
  console.log(props.fileInfo)
  if (props.fileInfo.fileSystemPath) {
    fileList.value.push({ name: props.fileInfo.fileSystemPath, url: props.fileInfo.getImageUrl() });
    showUpload.value = false;
  }
});

</script>

<style lang="scss" scoped>
.inside {
  display: block;
  margin: 0 auto;
  text-align: center;
}

.b1 {
  cursor: pointer;
  color: #DCDFE6;
  margin-bottom: 30px;
}

.b1:hover {
  cursor: pointer;
  color: #ffffff;
}

.b2 {
  cursor: pointer;
  color: #DCDFE6;
}

.b2:hover {
  cursor: pointer;
  color: #ffffff;
}

:deep(.el-upload-list__item.is-success) {
  margin: 0px;
}

.plus-cr {
  font-size: 20px;
}

.hideUpload {
  .el-upload {
    display: none;
  }
}

.avatar-uploader-cover {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  overflow: hidden;
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
  max-height: var(--height) !important;
  height: 100% !important;
}

:deep(.el-upload-list--picture-card) {
  display: flex;
  justify-content: center;
  width: calc(100% - 2px);
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
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  width: auto;
}
</style>
