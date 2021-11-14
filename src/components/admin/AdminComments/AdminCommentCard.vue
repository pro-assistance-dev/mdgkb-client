<template>
  <el-card :style="{ 'box-shadow': comment.modChecked ? 'grey 0px 1px 4px' : 'orange 0px 1px 4px' }">
    <template #header>
      <div class="comment-header">
        <div class="left">
          <span class="commentTo">{{ comment.commentTo }}</span>
          <span class="title">{{ comment.title }}</span>
        </div>
        <div class="right">
          <span class="name">{{ comment.user.email }}</span>
          <span class="time">{{ $dateFormatRu(comment.publishedOn, true) }}</span>
        </div>
      </div>
    </template>
    <div>{{ comment.text }}</div>
    <div class="comment-footer">
      <div class="footer-left">
        <el-tag v-if="!comment.modChecked" type="warning" style="margin-right: 10px">Неотмодерирован</el-tag>
        <el-tag v-if="comment.positive" type="success">Отображается на главной</el-tag>
        <el-tag v-else type="danger">Не отображается на главной</el-tag>
      </div>
      <div class="footer-right">
        <el-button type="success" size="mini" icon="el-icon-success" @click="markPositive">Отображать</el-button>
        <el-button type="danger" size="mini" icon="el-icon-error" @click="markNegative">Не Отображать</el-button>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useStore } from 'vuex';

import IComment from '@/interfaces/comments/IComment';

export default defineComponent({
  name: 'AdminCommentCard',
  props: {
    comment: {
      type: Object as PropType<IComment>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const markPositive = () => {
      store.commit('comments/markPositive', props.comment);
      store.dispatch('comments/modChecked', props.comment);
    };
    const markNegative = () => {
      store.commit('comments/markNegative', props.comment);
      store.dispatch('comments/modChecked', props.comment);
    };
    return {
      markPositive,
      markNegative,
    };
  },
});
</script>

<style lang="scss" scoped>
.comment-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-style: italic;
  .title {
    font-style: normal;
    font-weight: bold;
  }
  .left {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .right {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}
.comment-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-card {
  margin-bottom: 20px;
  max-width: 1400px;
}
:deep(.el-card__header) {
  padding: 10px;
}
:deep(.el-card__body) {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  min-height: 80px;
}
</style>
