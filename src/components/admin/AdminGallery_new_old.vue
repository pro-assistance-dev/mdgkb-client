<template>
  <draggable class="groups" :list="fileList" item-key="id" handle=".el-icon-s-grid" @end="sort(fileList)">
    <template #item="{ element, index }">
      <div>
        <i class="el-icon-s-grid drug-icon" />
        <!-- <UploaderSingleScan
          :file-info="element.fileInfo"
          :height="100"
          :width="100"
          @remove-file="$classHelper.RemoveFromClassByIndex(index, fileList, fileListForDelete)"
        /> -->
        <UploaderSingleScanNew
          :file-info="element.fileInfo"
          :height="100"
          :width="100*element.ratio"
          @remove-file="$classHelper.RemoveFromClassByIndex(index, fileList, fileListForDelete)"
          @ratio="(e) => (element.ratio = e)"

        />
        <el-button @click="$classHelper.RemoveFromClassByIndex(index, fileList, fileListForDelete)">Удалить изображение</el-button>
        {{ element.ratio }}
        <!-- {{ ratio }} -->
        <!-- @ratio="element.ratio = ratio" -->
      </div>
    </template>
  </draggable>
  <el-button @click="$emit('addImage')"> Добавить изображение </el-button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import draggable from 'vuedraggable';

import UploaderSingleScanNew from '@/components/UploaderSingleScan_new.vue';
import UploaderSingleScan from '@/components/UploaderSingleScan.vue';
import IFiler from '@/interfaces/IFiler';
import sort from '@/services/sort';

export default defineComponent({
  name: 'AdminGallery',
  components: { UploaderSingleScan, draggable, UploaderSingleScanNew },
  emits: ['addImage', 'ratio'],
  props: {
    fileList: {
      type: Array as PropType<IFiler[]>,
      reguired: true,
      default: () => [],
    },
    fileListForDelete: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  setup(props, {emit}) {

    // const ratio = (resolution:Number) => {
    //   console.log('Соотношение в AdminGallery: ' + resolution);
    // };

    return {
      sort, 
      // ratio,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';
.gallery {
  width: 100%;
  text-align: center;
}

$news-content-max-width: 400px;
$news-content-max-height: 165px;

/* .hideUpload {
  :deep(.el-upload) {
    display: none;
  }
} */

.avatar-uploader-cover {
  // height: 400px;
  height: auto;
  text-align: center;
  align-content: center;
}

.custom-plus {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}

:deep(.el-upload) {
  width: $news-content-max-width;
  height: $news-content-max-height;
  background: white;
  text-align: center;
  line-height: $news-content-max-height;
}

:deep(.el-upload-list__item) {
  width: $news-content-max-width !important;
  height: $news-content-max-height !important;
}

:deep(.el-upload-list__item-thumbnail) {
  width: $news-content-max-width !important;
  height: $news-content-max-height !important;
}

:deep(.el-upload-list__item) {
  transition: unset;
}

.card-header {
  text-align: start;
}

:deep(.el-dialog__body) {
  margin: 0px;
  padding: 10px 0 1px 0;
}

:deep(.el-dialog) {
  overflow: hidden;
}

:deep(.el-form--label-top .el-form-item) {
  display: flex;
}

:deep(.el-form-item__content) {
  width: 100%;
}

:deep(.el-input__inner) {
  border-radius: 40px;
  padding-left: 25px;
  height: 32px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
}

:deep(.el-input__inner::placeholder) {
  color: #4a4a4a;
}

:deep(.el-select .el-input .el-select__caret) {
  color: #343e5c;
  font-size: 15px;
  font-weight: bold;
  margin-right: 5px;
  margin-top: 4px;
}

.el-select {
  width: 100%;
}

:deep(.el-input__prefix) {
  left: 230px;
  top: -3px;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
  width: 100%;
}

:deep(.el-input__icon) {
  color: #343e5c;
}

:deep(.el-input__suffix) {
  top: -3px;
}

:deep(.el-form-item__label) {
  font-size: 12px;
  color: #a3a9be;
  padding: 0 !important;
  text-transform: uppercase;
  margin-left: 5px;
  height: 30px;
}

:deep(.el-input__prefix) {
  left: auto;
  right: 10px;
}

:deep(.el-form-item) {
  margin-bottom: 10px;
}

:deep(.el-checkbox__input) {
  margin-left: 24px;
}

:deep(.el-form) {
  padding: 0;
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

:deep(.el-input-number__increase) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

:deep(.el-input-number__decrease) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}
</style>
