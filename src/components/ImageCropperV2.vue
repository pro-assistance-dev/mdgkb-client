<template>
  <el-dialog :model-value="open" title="Настройка изображения" :close-on-click-modal="false" :close-on-press-escape="false">
    <div class="background-container">
      <div class="tools-line">
        <div class="line-block">
          <el-form-item label="Задайте пропорции фото:" >
            <el-select v-model="resolution" label="Пропорции изображения" @change="selectResolution">
              <el-option label="2:3 (формат A4)" :value="0.6667" />
              <el-option label="4:3 (для карточек новостей)" :value="1.3333" />
              <el-option label="1:1 (для фото сотрудников)" :value="1" />
              <el-option label="3:2" :value="1.5" />
              <el-option label="16:9" :value="1.7778" />
              <el-option label="3:4 (вертикальное изображение)" :value="0.75" />
              <el-option label="Задать свои пропорции" :value="3" />
            </el-select>
          </el-form-item>
      </div>
      <el-form-item v-if="resolution === 3" class="line-item" label="Ширина">
        <el-input-number placeholder="4"></el-input-number>
      </el-form-item>
      <el-form-item v-if="resolution === 3" class="line-item" label="Высота">
        <el-input-number placeholder="3"></el-input-number>
      </el-form-item>

      </div>
      <Cropper
        v-if="cropper.ratio"
        ref="cropperRef"
        :src="cropper.src"
        :stencil-props="{ aspectRatio: cropper.ratio }"
        style="max-height: 50vh"
        @change="onChange"
      />

      <Cropper v-else ref="cropperRef" :src="cropper.src" style="max-height: 50vh" @change="onChange" />
      <div class="dialog-footer">
        <!--      <el-button :loading="loading" type="warning" @click="cancel">Отменить</el-button>-->
        <el-button :loading="loading" type="success" @click="save">Сохранить</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import 'vue-advanced-cropper/dist/style.css';

import { computed, defineComponent, Ref, ref } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import { useStore } from 'vuex';

import ICanvasResult from '@/interfaces/canvas/ICanvasResult';
import ICoordinates from '@/interfaces/canvas/ICoordinates';
import { ICropper } from '@/interfaces/cropper/ICropper';
import Provider from '@/services/Provider';

export default defineComponent({
  name: 'ImageCropperV2',
  components: { Cropper },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['crop', 'close', 'ratio'],
  setup(props, { emit }) {
    const cropper: Ref<ICropper> = computed(() => Provider.store.getters[`cropper/cropperV2`]);
    const resolution: Ref<number>  = ref(1);

    const selectResolution = async () => {
      if (resolution !== null) {
        console.log('Ручное:' + resolution.value);
      }
    }

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
      console.log('cropperRef' + canvas.value)

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

    return { save, cancel, onChange, resultImage, cropperRef, loading, cropper, resolution, selectResolution };
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
  /* background: #dff2f8; */
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
