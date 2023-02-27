<template>
  <div class="move-buttons">
    <el-button v-if="index !== 0" icon="el-icon-caret-top" @click="move(true)" />
    <el-button v-if="index !== items.length - 1" icon="el-icon-caret-bottom" @click="move(false)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IOrdered from '@/services/interfaces/IOrdered';
import { moveDown, moveUp } from '@/services/moves';
export default defineComponent({
  name: 'TableMover',
  props: {
    index: {
      type: Number,
      default: 0,
    },
    items: {
      type: Object as PropType<IOrdered[]>,
      required: true,
    },
  },
  setup(props) {
    const move = (up: boolean) => (up ? moveUp(props.items, props.index) : moveDown(props.items, props.index));
    return {
      move,
    };
  },
});
</script>

<style lang="scss" scoped>
.move-buttons {
  :deep(.el-button) {
    padding: 5px;
    margin: 0 !important;
    min-height: unset;
    border: none;
  }
}
</style>
