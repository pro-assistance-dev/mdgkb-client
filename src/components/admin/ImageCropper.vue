<template>
  <Cropper :src="src" ref="cropper" @change="onChange" :stencil-props="{ aspectRatio: ratio }" />
  <div class="dialog-footer">
    <el-button :loading="loading" @click="cancel">Отменить</el-button>
    <el-button :loading="loading" @click="save">Сохранить</el-button>
  </div>
</template>

<script lang="ts">
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

import { defineComponent, PropType, ref } from 'vue';

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
  setup(props, { emit }) {
    const coordinates = ref({
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
        canvas.canvas.toBlob((blob: any) => {
          emit('save', { blob: blob, src: canvas.canvas.toDataURL() });
        });
      }
    };

    const cancel = () => {
      // cropOpen.value = false;
    };
    const onChange = (opt: any) => {
      coordinates.value = opt.coordinates;
      resultImage.value = opt.canvas.toDataURL();
    };
    return { save, cancel, onChange, resultImage, cropper };
  },
});
</script>

<style scoped></style>
