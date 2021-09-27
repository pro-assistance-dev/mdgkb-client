<template>
  <div class="flex-row-between">
    <div>
      <span> {{ label }} </span>
    </div>
    <div>
      <el-button s size="small" type="success" icon="el-icon-plus" @click="$emit('add')">{{ buttonText }}</el-button>
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
    buttonText: {
      type: String,
      default: 'Добавить',
    },
  },
  emits: ['add'],
});
</script>
<style>
.flex-row-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
