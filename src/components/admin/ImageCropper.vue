<template>
  <Cropper ref="cropper" :src="src" :stencil-props="{ aspectRatio: ratio }" style="max-height: 50vh" @change="onChange" />
  <div class="dialog-footer">
    <el-button :loading="loading" type="warning" @click="$emit('cancel')">Отменить</el-button>
    <el-button :loading="loading" type="success" @click="save">Сохранить</el-button>
  </div>
</template>

<script lang="ts">
import 'vue-advanced-cropper/dist/style.css';

import { defineComponent, Ref, ref } from 'vue';
import { Cropper } from 'vue-advanced-cropper';

import ICanvasResult from '@/interfaces/canvas/ICanvasResult';
import ICoordinates from '@/interfaces/canvas/ICoordinates';

export default defineComponent({
  name: 'ImageCropper',
  components: { Cropper },
  props: {
    src: {
      type: String,
      required: true,
    },
    ratio: {
      type: Number,
      required: true,
    },
  },
  emits: ['save', 'cancel'],
  setup(props, { emit }) {
    const coordinates: Ref<ICoordinates> = ref({
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    });

    const loading = ref(false);
    const resultImage = ref('');
    const cropper = ref();

    const save = async () => {
      loading.value = true;
      const canvas = cropper.value.getResult();
      if (canvas) {
        console.log(canvas);
        canvas.canvas.toBlob((blob: Blob) => {
          emit('save', { blob: blob, src: canvas.canvas.toDataURL() });
        });
      }
      loading.value = false;
    };

    const onChange = (res: ICanvasResult) => {
      coordinates.value = res.coordinates;
      resultImage.value = res.canvas.toDataURL();
    };
    return { save, onChange, resultImage, cropper, loading };
  },
});
</script>

<style scoped>
.dialog-footer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
