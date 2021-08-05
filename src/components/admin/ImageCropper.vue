<template>
  <Cropper :src="src" ref="cropper" @change="onChange" :stencil-props="{ aspectRatio: ratio }" style="max-height: 50vh" />
  <div class="dialog-footer">
    <el-button :loading="loading" @click="cancel" type="warning">Отменить</el-button>
    <el-button :loading="loading" @click="save" type="success">Сохранить</el-button>
  </div>
</template>

<script lang="ts">
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'ImageCropper',
  components: { Cropper },
  emits: ['save', 'cancel'],
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
      loading.value = false;
    };

    const cancel = () => {
      emit('cancel');
    };

    const onChange = (opt: any) => {
      coordinates.value = opt.coordinates;
      resultImage.value = opt.canvas.toDataURL();
    };
    return { save, cancel, onChange, resultImage, cropper, loading };
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
