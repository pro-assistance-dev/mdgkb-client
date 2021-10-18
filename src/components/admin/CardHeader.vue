<template>
  <div class="flex-row-between">
    <div>
      <span> {{ label }} </span>
    </div>
    <div class="flex-row-between">
      <el-button v-if="addButton" s size="small" type="success" icon="el-icon-plus" @click="$emit('add')">{{ addButtonText }}</el-button>
      <el-button v-if="removeButton" s size="small" type="danger" icon="el-icon-delete" @click="$emit('remove')">{{
        removeButtonText
      }}</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CardHeader',
  props: {
    label: {
      type: String,
      required: true,
    },
    addButtonText: {
      type: String,
      default: 'Добавить',
    },
    addButton: {
      type: Boolean,
      default: true,
    },
    removeButton: {
      type: Boolean,
      default: false,
    },
    removeButtonText: {
      type: String,
      default: 'Удалить',
    },
  },
  emits: ['add', 'remove'],
});
</script>
<style>
.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
