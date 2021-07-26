<template>
  <!--    &lt;!&ndash;        <div class="row items-center">&ndash;&gt;-->
  <!--    <div class="col text-left">-->
  <Cropper :src="src" ref="cropper" @change="onChange" :stencil-props="{ aspectRatio: 1 }" />
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
        canvas.canvas.toBlob((blob: any) => {
          emit('save', blob);
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
