<template>
  <draggable class="groups" :list="fileList" item-key="id" handle=".move" @end="Arrays.Sort(fileList)">
    <template #item="{ element, index }">
      <div class="item">
        <div class="move">
          <div class="item-tools">
            <svg class="icon-move">
              <use xlink:href="#move"></use>
            </svg>
            <button class="admin-del2" @click.prevent="remove(element)">Удалить</button>
          </div>
          <UploaderSingleScan
            :file-info="element.fileInfo"
            :height="150"
            :default-ratio="defaultRatio"
            @remove-file="$classHelper.RemoveFromClassByIndex(index, fileList, fileListForDelete)"
            @ratio="(e) => (element.ratio = e)"
            @crop="crop(element)"
          />
        </div>
        <div class="item-description">
          <input v-model="element.description" class="item-description-form" placeholder="..." />
        </div>
      </div>
    </template>
  </draggable>
  <Move />
</template>

<script lang="ts" setup>
import { defineComponent, PropType } from 'vue';
import draggable from 'vuedraggable';

import Move from '@/services/assets/svg/Move.svg';
import UploaderSingleScan from '@/services/components/UploaderSingleScan.vue';
import IFiler from '@/services/interfaces/IFiler';
import Arrays from '@/services/Arrays';
import ClassHelper from '@/services/ClassHelper';
const props = defineProps({
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
  upload: {
    type: Boolean,
    required: false,
    default: true,
  },
});
const emits = defineEmits(['addImage', 'ratio', 'remove']);
const crop = async (filer: IFiler) => {
  emits('addImage', filer);
};

const remove = async (filer: IFiler) => {
  ClassHelper.RemoveFromClassById(filer.id, props.fileList, []);
  emits('remove', filer);
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';

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
  border-radius: $border-radius;
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

.item-description-form {
  height: 18px;
  border: $normal-darker-border;
  border-radius: 10px;
  width: 250px;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
  padding: 0 0 0 15px;
  margin: 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  outline: none;
  color: #4a4a4a;
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
  border-top-left-radius: $border-radius;
  border-top-right-radius: $border-radius;
  border-bottom: $normal-darker-border;
  cursor: pointer;
  transition: 0.3s;
}

.item-description {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 28px;
  background: #f9fafb;
  border-bottom-left-radius: $border-radius;
  border-bottom-right-radius: $border-radius;
  border-top: $normal-darker-border;
  width: 100%;
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

:deep(.el-upload-list--picture-card .el-upload-list__item) {
  margin: 10px;
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
