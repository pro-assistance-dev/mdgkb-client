<template>
  <div style="display: flex; width: 100%; justify-content: space-between; margin-bottom: 20px">
    <div>{{ title }}</div>
    <el-button type="success" @click="$emit('addElement')">Добавить</el-button>
  </div>
  <draggable class="groups" :list="sortableList" item-key="id" handle=".drug-icon" @end="sort(sortableList)">
    <template #item="{ element, index }">
      <div class="list-row">
        <i class="el-icon-s-grid drug-icon" />
        <el-input v-model="element.name" />
        <el-button icon="el-icon-delete" @click="removeFromClass(index, sortableList, sortableListForDelete)"></el-button>
      </div>
    </template>
  </draggable>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import draggable from 'vuedraggable';

import IOrdered from '@/interfaces/IOrdered';
import removeFromClass from '@/services/removeFromClass';
import sort from '@/services/sort';
export default defineComponent({
  name: 'SortableInputsList',
  components: { draggable },
  props: {
    sortableList: {
      type: Array as PropType<IOrdered[]>,
      default: () => [],
    },
    sortableListForDelete: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    title: {
      type: String,
      required: true,
    },
  },
  emits: ['addElement'],

  setup() {
    return {
      sort,
      removeFromClass,
    };
  },
});
</script>

<style lang="scss" scoped>
.list-row {
  display: flex;
  align-items: center;
  margin: 10px 0;
  .el-input {
    margin: 0 10px;
  }
  .drug-icon {
    cursor: pointer;
  }
}
</style>
