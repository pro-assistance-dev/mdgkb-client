<template>
  <div id="drop-area" class="img-container">
    <div v-if="uploadedImg">
      <div class="img-block" :style="{ width: height * defaultRatio - 2 + 'px', height: height + 'px' }">
        <img class="el-upload-list__item-thumbnail" :src="uploadedImg.url" alt="upload-image" />
      </div>
      <div class="tools-button">
        <div class="ins">
          <PButton skin="text" text="Изменить" font-size="20px" width="300px" margin="100px 0 0 0" @click="openCropper(uploadedImg)" />
          <PButton skin="text" text="Удалить" font-size="20px" width="300px" margin="50px 0 0 0" @click="handleRemove()" />
        </div>
      </div>
    </div>

    <div v-else>
      <div class="add-button" :style="{ width: height * defaultRatio - 2 + 'px', height: height + 'px' }">
        <PButton skin="text" text="Добавить" font-size="20px" @click="openUploadDialog" />
      </div>
    </div>
  </div>
  <input :id="fileInputId" type="file" hidden @change="uploadFile" />
  <ImageCropper v-if="withCrop" :open="cropperOpened" :default-ratio="defaultRatio" @crop="crop" @close="cropperOpened = false" />
</template>

<script lang="ts" setup>
import Cropper from '@/services/classes/Cropper';
import FileInfo from '@/services/classes/FileInfo';

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
const fileInputId = Strings.CreateGuid();
const cropperOpened = ref(false);
const uploader = ref();

// const toggleUpload = (file: any) => {
//   props.fileInfo.uploadNewFile(file);
//   if (props.fileInfo.fileSystemPath) {
//     uploadedImg.value = props.fileInfo;
//     uploadedImg.value.url = props.fileInfo.getImageUrl();
//     // .push({ name: props.fileInfo.fileSystemPath, url: file.url });
//   }
//   if (props.withCrop) {
//     openCropper(file);
//   }
// };

const openCropper = (file: any) => {
  const ratio = props.cropRatio ? props.defaultRatio : 0;
  CropperStore.Open(Cropper.CreateCropper(file.url, ratio, props.fileInfo.id));
  cropperOpened.value = true;
};

const handleRemove = () => {
  PHelp.Dialog.Show({
    text: 'Вы хотите удалить изображение',
    confirmButtonText: 'Удалить',
    cancelButtonText: 'Не удалять',
  }).then(() => {
    uploadedImg.value = undefined;
    uploader.value.clearFiles();
    emits('removeFile');
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
    uploadedImg.value.url = props.fileInfo.getImageUrl() as string;
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

  fileInput = document.getElementById(fileInputId) as HTMLInputElement;
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

.ins {
  display: block;
  width: 300px;
  height: 300px;
}

.img-container {
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
}

.add-button {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  font-size: 20px;
  opacity: 0.5;
}

.add-button:hover {
  opacity: 1;
}

.tools-button {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  font-size: 20px;
  opacity: 0;
}

.tools-button:hover {
  background: #000;
  opacity: 0.8;
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

.flex-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.img-block {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  width: auto;
}
</style>
