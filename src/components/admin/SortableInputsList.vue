<template>
  <draggable class="groups" :list="sortableList" item-key="id" handle=".drug-icon" @end="sort(sortableList)">
    <template #item="{ element, index }">
      <div>
        <i class="el-icon-s-grid drug-icon" />
        <el-input v-model="element.name" />
        <el-button @click="removeFromClass(index, sortableList, sortableListForDelete)">Удалить</el-button>
      </div>
    </template>
  </draggable>
  <el-button @click="$emit('addElement')">Добавить</el-button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import draggable from 'vuedraggable';

import IOrdered from '@/interfaces/IOrdered';
import removeFromClass from '@/mixins/removeFromClass';
import sort from '@/mixins/sort';
export default defineComponent({
  name: 'SortableInputsList',
  components: { draggable },
  emits: ['addElement'],
  props: {
    sortableList: {
      type: Array as PropType<IOrdered[]>,
      default: () => [],
    },
    sortableListForDelete: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  setup() {
    return {
      sort,
      removeFromClass,
    };
  },
});
</script>

<style lang="scss" scoped></style>
