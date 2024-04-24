<template>
  <el-dialog
    :model-value="open"
    title="Настройка изображения"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <div class="background-container">
      <div class="tools-line">
        <div class="line-block">
          <el-form>
            <el-form-item label="Задайте пропорции фото:">
              <el-select v-model="resolution" label="Пропорции изображения" @change="selectResolution">
                <el-option label="2:3 (формат A4)" :value="2 / 3" />
                <el-option label="4:3 (для карточек новостей)" :value="4 / 3" />
                <el-option label="1:1 (для фото сотрудников)" :value="1" />
                <el-option label="3:2" :value="3 / 2" />
                <el-option label="16:9" :value="16 / 9" />
                <el-option label="3:4 (вертикальное изображение)" :value="3 / 4" />
                <el-option label="Задать пропорции вручную" :value="0" />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <Cropper
        ref="cropperRef"
        :src="cropper.src"
        :stencil-props="{ aspectRatio: cropper.ratio }"
        style="max-height: 50vh; min-height: 50vh"
        @change="onChange"
      />

      <div class="dialog-footer">
        <el-button :loading="loading" type="success" @click="save"> Сохранить </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import 'vue-advanced-cropper/dist/style.css';

import { computed, Ref, ref } from 'vue';
import { Cropper } from 'vue-advanced-cropper';

import ICanvasResult from '@/services/interfaces/canvas/ICanvasResult';
import ICoordinates from '@/services/interfaces/canvas/ICoordinates';
import Provider from '@/services/Provider/Provider';

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  defaultRatio: {
    type: Number,
    required: false,
    default: 1,
  },
});
const emits = defineEmits(['crop', 'close']);

const cropper = computed(() => Provider.store.getters[`cropper/cropper`]);
const resolution: Ref<number> = ref(props.defaultRatio);

cropper.value.ratio = resolution.value;

const selectResolution = async () => {
  if (resolution.value === 0) {
    cropper.value.ratio = 0;
  } else {
    cropper.value.ratio = resolution.value;
  }
};

const coordinates: Ref<ICoordinates> = ref({
  width: 0,
  height: 0,
  left: 0,
  top: 0,
});

const loading = ref(false);
const resultImage = ref('');
const cropperRef = ref();

const save = async () => {
  loading.value = true;
  const canvas = cropperRef.value.getResult();
  if (cropper.value.ratio === 0) {
    resolution.value = coordinates.value.width / coordinates.value.height;
  }
  if (canvas) {
    canvas.canvas.toBlob((blob: Blob) => {
      emits('crop', { blob: blob, src: canvas.canvas?.toDataURL() });
    });
  }

  loading.value = false;
};

const cancel = () => {
  resultImage.value = '';
  emits('close');
};

const onChange = (res: ICanvasResult) => {
  coordinates.value = res.coordinates;
  resultImage.value = res.canvas?.toDataURL();
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.dialog-footer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.background-container {
  width: auto;
  padding: 10px;
  margin: 0 20px 20px 20px;
  background: #dff2f8;
  border-radius: 5px;
  border: 1px solid #c3c3c3;
}

.tools-line {
  display: flex;
  justify-content: left;
  align-items: center;
}

.line-item {
  margin-left: 20px;
}

.foto-select {
  width: 280px;
}

.line-block {
  width: 280px;
}

:deep(.el-input__inner) {
  border-radius: 40px;
  padding-left: 15px;
  height: 32px;
  width: 270px;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 14px;
}

:deep(.el-form-item__label) {
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 12px;
  color: #a3a9be;
  padding: 0 !important;
  text-transform: uppercase;
  margin-left: 5px;
  height: 40px;
}

:deep(.el-select .el-input .el-select__caret) {
  color: #343e5c;
  font-size: 15px;
  font-weight: bold;
  margin-right: 5px;
  margin-top: 1px;
}

:deep(.el-select .el-input .el-select__caret.el-icon-circle-close) {
  height: 40px;
}

:deep(.el-select .el-input__suffix) {
  top: -3px;
}

:deep(.el-form-item) {
  display: block;
  margin-bottom: 16px;
}

@media only screen and (max-width: 480px) {
  .background-container {
    width: auto;
    padding: 10px;
    margin: 0 10px 10px 10px;
  }

  :deep(.el-input__inner) {
    border-radius: 40px;
    padding-left: 15px;
    height: 32px;
    width: 250px;
    display: flex;
    font-family: Comfortaa, Arial, Helvetica, sans-serif;
    font-size: 14px;
  }
}
</style>
