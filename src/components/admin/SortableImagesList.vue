<template>
  <draggable class="groups" :list="fileList" item-key="id" handle=".el-icon-s-grid" @end="sort(fileList)">
    <template #item="{ element, index }">
      <div>
        <i class="el-icon-s-grid drug-icon" />
        <UploaderSingleScan
          :file-info="element.fileInfo"
          :height="165"
          :width="400"
          @remove-file="removeFromClass(index, fileList, fileListForDelete)"
        ></UploaderSingleScan>
      </div>
    </template>
  </draggable>
  <el-button @click="$emit('addElement')">Добавить</el-button>
</template>

<script lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import { defineComponent, PropType } from 'vue';
import draggable from 'vuedraggable';

import UploaderSingleScan from '@/components/UploaderSingleScan.vue';
import IFiler from '@/interfaces/IFiler';
import removeFromClass from '@/mixins/removeFromClass';
import sort from '@/mixins/sort';

export default defineComponent({
  name: 'SortableImagesList',
  components: { UploaderSingleScan, draggable },
  emits: ['addElement'],
  props: {
    fileList: {
      type: Array as PropType<IFiler[]>,
      default: () => [],
    },
    fileListForDelete: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  setup(props) {
    return {
      sort,
      removeFromClass,
    };
  },
});
</script>

<style lang="scss" scoped>
.gallery {
  width: 100%;
  text-align: center;
}

$news-content-max-width: 400px;
$news-content-max-height: 165px;

.hideUpload {
  :deep(.el-upload) {
    display: none;
  }
}

.avatar-uploader-cover {
  // height: 400px;
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
</style>
