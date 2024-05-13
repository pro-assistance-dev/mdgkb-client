<template>
  <div class="status-container">
    <el-tag v-if="form.isNew" size="small" type="warning">Не просмотрено</el-tag>
    <el-tag
      v-if="form.formStatus.label"
      size="small"
      :style="`background-color: inherit; color: ${form.formStatus.color}; border-color: ${form.formStatus.color}; line-height: 1; padding: 5px 10px`"
    >
      {{ form.formStatus.label }}
    </el-tag>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Form from '@/classes/Form';

export default defineComponent({
  name: 'TableFormStatus',
  props: {
    form: {
      type: Object as PropType<Form>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
.status-container {
  display: flex;
  flex-wrap: wrap;
  :deep(.el-tag) {
    margin: 2px;
    display: block;
    word-wrap: break-word;
    white-space: normal;
    height: auto;
  }
}
</style>
