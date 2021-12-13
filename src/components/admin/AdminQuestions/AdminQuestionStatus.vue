<template>
  <div>
    <el-tag v-if="question.isNew" size="small" type="warning">Новый</el-tag>
    <el-tag v-if="!question.publishAgreement" size="small" type="info">Публикация запрещена</el-tag>
    <el-tag v-else-if="question.published" size="small" type="success">Опубликован</el-tag>
    <el-tag v-else size="small" type="danger">Не опубликован</el-tag>
    <el-tag v-if="question.answered" size="small" type="success">Отвечен</el-tag>
    <el-tag v-else size="small" type="danger">Не отвечен</el-tag>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IQuestion from '@/interfaces/IQuestion';
export default defineComponent({
  name: 'AdminQuestionStatus',
  props: {
    question: {
      type: Object as PropType<IQuestion>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.el-tag {
  margin: 3px;
}
</style>
