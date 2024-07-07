<template>
  <div id="drop-area" @click="openUploadDialog">
    <template v-if="uploadedImg">
      <div class="div1" :style="{ width: height * defaultRatio - 2 + 'px', height: height + 'px' }">
        <img class="el-upload-list__item-thumbnail" :src="uploadedImg.url" alt="upload-image" />
      </div>
      <div class="el-upload-list__item-actions">
        <div class="inside">
          <div class="b1" @click="openCropper(uploadedImg)">Изменить</div>
          <div class="b2" @click="handleRemove()">Удалить</div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="plus-cr" :style="{ width: height * defaultRatio - 2 + 'px', height: height + 'px' }">Добавить</div>
    </template>
  </div>
  <input type="file" id="file-input" hidden @change="uploadFile" />
  <ImageCropper v-if="withCrop" :open="cropperOpened" :default-ratio="defaultRatio" @crop="crop" @close="cropperOpened = false" />
</template>

<script lang="ts" setup>
import FileInfo from '@/services/classes/FileInfo';
import Cropper from '@/services/classes/Cropper';

const props = defineProps({
  withCrop: {
    type: Boolean,
    default: true,
  },
  fileInfo: {
    type: FileInfo,
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
const uploadedImg: Ref<FileInfo | undefined> = ref(undefined);
const heightWeight = computed(() => {
  return {
    '--height': `${props.height}px`,
  };
});
const cropperOpened = ref(false);
const uploader = ref();

const toggleUpload = (file: any) => {
  props.fileInfo.uploadNewFile(file);
  if (props.fileInfo.fileSystemPath) {
    uploadedImg.value = props.fileInfo;
    uploadedImg.value.url = props.fileInfo.getImageUrl();
    // .push({ name: props.fileInfo.fileSystemPath, url: file.url });
  }
  if (props.withCrop) {
    openCropper(file);
  }
};

const openCropper = (file: any) => {
  const ratio = props.cropRatio ? props.defaultRatio : 0;
  Store.Commit('cropper/open', Cropper.CreateCropper(file.url, ratio, props.fileInfo.id));
  cropperOpened.value = true;
};

const handleRemove = () => {
  PHelp.Dialog
    .Show({
      text: 'Вы хотите удалить изображение',
      confirmButtonText: 'Удалить',
      cancelButtonText: 'Не удалять',
    })
    .then(() => {
      uploader.value.clearFiles();
      emits('removeFile');
    })
    .catch(() => {
      return;
    });
};

const crop = (file: any) => {
  props.fileInfo.setFile(file);
  if (props.fileInfo.fileSystemPath) {
    uploadedImg.value = props.fileInfo;
    // fileList.value.push({ name: props.fileInfo.fileSystemPath, url: file.src });
  }
  cropperOpened.value = false;
  emits('crop');
};

onBeforeMount(() => {
  console.log(props.fileInfo);
  if (props.fileInfo.fileSystemPath) {
    uploadedImg.value = props.fileInfo;
    uploadedImg.value.url = props.fileInfo.getImageUrl();
    // fileList.value.push({ name: props.fileInfo.fileSystemPath, url: props.fileInfo.getImageUrl() });
  }
});
let fileInput: HTMLInputElement | null = null;

onMounted(() => {
  const dropArea = document.getElementById('drop-area');
  if (!dropArea) {
    return;
  }
  dropArea.addEventListener('dragover', (e) => {
    preventDefaults(e);
    dropArea.classList.add('drag-over');
  });

  dropArea.addEventListener('dragleave', (e) => {
    preventDefaults(e);
    dropArea.classList.remove('drag-over');
  });

  dropArea.addEventListener('dragenter', preventDefaults);
  dropArea.addEventListener('dragleave', preventDefaults);
  dropArea.addEventListener('drop', handleDrop);

  fileInput = document.getElementById('file-input') as HTMLInputElement;
});
//
function preventDefaults(e: any) {
  e.preventDefault();
  e.stopPropagation();
}
const openUploadDialog = () => {
  if (fileInput) {
    fileInput.click();
  }
};

function handleDrop(e: any) {
  e.preventDefault();
  const files = e.dataTransfer.files;
  if (files.length && fileInput) {
    fileInput.files = files;
    uploadFile();
  }
}
const uploadFile = () => {
  if (!fileInput || !fileInput.files || !fileInput.files.length) {
    return;
  }
  const file = fileInput.files[0];
  file.url = URL.createObjectURL(file);
  uploadedImg.value = file;
  props.fileInfo.uploadNewFile(file);
  openCropper(uploadedImg.value);
};
</script>

<style lang="scss" scoped>
#drop-area {
  width: 300px;
  height: 300px;
  margin: 20px auto;
  text-align: center;
  line-height: 200px;
  border: 2px dashed #ccc;
  cursor: pointer;
  &:hover {
    border: 2px dashed #aaa;
  }
}

.drag-over {
  background-color: #eee;
}

.inside {
  display: block;
  margin: 0 auto;
  text-align: center;
}

.b1 {
  cursor: pointer;
  color: #dcdfe6;
  margin-bottom: 30px;
}

.b1:hover {
  cursor: pointer;
  color: #ffffff;
}

.b2 {
  cursor: pointer;
  color: #dcdfe6;
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
