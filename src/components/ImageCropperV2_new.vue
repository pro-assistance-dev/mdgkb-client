<template>
  <el-dialog :model-value="open" title="Настройка изображения" :close-on-click-modal="false" :close-on-press-escape="false">
    <div class="background-container">
      <div class="tools-line">
        <div class="line-block">
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
        </div>
      </div>
      <Cropper
        ref="cropperRef"
        :src="cropper.src"
        :stencil-props="{ aspectRatio: cropper.ratio }"
        style="max-height: 50vh"
        @change="onChange"
      />

      <div class="dialog-footer">
        <el-button :loading="loading" type="success" @click="save">Сохранить</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import 'vue-advanced-cropper/dist/style.css';

import { computed, defineComponent, Ref, ref } from 'vue';
import { Cropper } from 'vue-advanced-cropper';

import ICanvasResult from '@/interfaces/canvas/ICanvasResult';
import ICoordinates from '@/interfaces/canvas/ICoordinates';
import { ICropper } from '@/interfaces/cropper/ICropper';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'ImageCropperV2New',
  components: { Cropper },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    defaultRatio: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  emits: ['crop', 'close'],
  setup(props, { emit }) {
    const cropper: Ref<ICropper> = computed(() => Provider.store.getters[`cropper/cropperV2`]);
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

    console.log(coordinates);
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
          emit('crop', { blob: blob, src: canvas.canvas?.toDataURL() });
        });
      }

      loading.value = false;
    };

    const cancel = () => {
      resultImage.value = '';
      emit('close');
    };

    const onChange = (res: ICanvasResult) => {
      coordinates.value = res.coordinates;
      resultImage.value = res.canvas?.toDataURL();
    };

    return { save, cancel, onChange, resultImage, cropperRef, loading, cropper, selectResolution, resolution };
  },
});
</script>

<style scoped>
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
  width: 260px;
}
</style>
