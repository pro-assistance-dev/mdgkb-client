<template>
  <draggable class="groups" :list="fileList" item-key="id" handle=".move" @end="sort(fileList)">
    <template #item="{ element, index }">
      <div class="item">
        <div class="move">
          <div class="item-tools">
            <svg class="icon-move">
              <use xlink:href="#move"></use>
            </svg>
            <button class="admin-del2" @click.prevent="$classHelper.RemoveFromClassByIndex(index, fileList, fileListForDelete)">
              Удалить
            </button>
          </div>
          <UploaderSingleScanNew
            :file-info="element.fileInfo"
            :height="150"
            :default-ratio="defaultRatio"
            @remove-file="$classHelper.RemoveFromClassByIndex(index, fileList, fileListForDelete)"
            @ratio="(e) => (element.ratio = e)"
          />
        </div>
        <div class="item-description">
          <el-form-item class="hidden">
            <el-input v-model="element.description" placeholder="..." />
          </el-form-item>
        </div>
      </div>
    </template>
  </draggable>
  <Move />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import draggable from 'vuedraggable';

import Move from '@/assets/svg/AdminGallery/Move.svg';
import UploaderSingleScan from '@/components/UploaderSingleScan.vue';
import UploaderSingleScanNew from '@/components/UploaderSingleScan_new.vue';
import IFiler from '@/interfaces/IFiler';
import sort from '@/services/sort';

export default defineComponent({
  name: 'AdminGallery',
  components: { draggable, UploaderSingleScanNew, Move },
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
    defaultRatio: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  setup() {
    return {
      sort,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

:deep(.el-upload) {
  width: auto;
  height: auto;
  background: white;
  text-align: center;
  line-height: auto;
}

:deep(.el-upload-list__item) {
  width: auto;
  height: auto;
}

:deep(.el-upload-list__item-thumbnail) {
  width: auto;
  height: auto;
}

:deep(.el-upload-list__item) {
  transition: unset;
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
  height: 28px;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.el-input__inner) {
  border-radius: 40px;
  padding-left: 25px;
  height: 20px;
  width: 270px;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
  padding-left: 20px;
  margin: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

:deep(.el-input__inner::placeholder) {
  color: #a3a9be;
}

:deep(.el-select .el-input .el-select__caret) {
  color: #343e5c;
  font-size: 15px;
  font-weight: bold;
  margin-right: 5px;
  margin-top: 4px;
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
  margin-bottom: 0px;
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

:deep(.el-upload--picture-card) {
  width: 150px;
  font-size: 50px;
  margin: 10px;
}

:deep(.el-upload--picture-card i) {
  font-size: 50px;
  color: #00b5a4;
  padding: 0 54px;
}

.groups {
  width: 100%;
  max-height: 50vh;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  grid-template-rows: repeat(0 5px);
  grid-auto-rows: 250px;
  overflow: hidden;
  overflow-y: scroll;
}

.groups > div {
  max-width: 290px;
  min-width: 120px;
  height: 230px;
  object-fit: cover;
  overflow: hidden;
}

.item {
  height: 150px;
  object-fit: cover;
  position: relative;
  width: auto;
  border-radius: $normal-border-radius;
  border: $normal-darker-border;
  transition: 0.3s;
}

.item:hover {
  border: $dark-border;
  box-shadow: $normal-shadow;
}

.item:hover > .move > .item-tools > .icon-move {
  visibility: visible;
}

.hidden {
  height: 30px;
}

.item:hover > .item-tools {
  visibility: visible;
  border-bottom: $dark-border;
}

.item-tools {
  padding-left: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  background: #f9fafb;
  border-top-left-radius: $normal-border-radius;
  border-top-right-radius: $normal-border-radius;
  border-bottom: $normal-darker-border;
  cursor: pointer;
  transition: 0.3s;
}

.item-description {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  background: #f9fafb;
  border-bottom-left-radius: $normal-border-radius;
  border-bottom-right-radius: $normal-border-radius;
  border-top: $normal-darker-border;
  cursor: pointer;
  transition: 0.3s;
}

@keyframes ripple {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.15, 1.15);
  }
}

.icon-move {
  visibility: hidden;
  width: 24px;
  height: 24px;
  fill: #dff2f8;
  stroke: #747474;
  animation-name: ripple;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

.admin-del2 {
  border: none;
  background: inherit;
  color: #a3a9be;
  transition: 0.3s;
  cursor: pointer;
}

.admin-del2:hover {
  color: darken($color: #cf3d19, $amount: 5%);
}

.item-input {
  height: 20px;
}

@media screen and (max-width: 400px) {
  .background-container {
    margin: 0 10px 20px 10px;
  }

  .groups {
    width: 100%;
    height: 40vh;
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    grid-template-rows: repeat(0 5px);
    grid-auto-rows: 210px;
  }

  .groups > div {
    max-width: 230px;
    height: 200px;
    object-fit: cover;
    overflow: hidden;
    align-self: center;
    justify-self: center;
  }
}
</style>
