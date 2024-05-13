<template>
  <el-card :style="{ 'box-shadow': comment.modChecked ? 'grey 0px 1px 4px' : 'orange 0px 1px 4px' }">
    <template #header>
      <div class="comment-header">
        <div class="left">
          <span class="commentTo">{{ comment.commentTo }}</span>
          <router-link :to="comment.link" target="_blank">
            <span class="title">{{ comment.title }}</span>
          </router-link>
        </div>
        <div class="right">
          <span class="name">{{ comment.user.email }}</span>
          <span class="name">{{ comment.user.human.getFullName() }}</span>
          <span class="time">{{
            $dateTimeFormatter.format(comment.publishedOn, { month: 'long', hour: 'numeric', minute: 'numeric' })
          }}</span>
          <Rating :with-numbers="false" :comments="[{ comment: comment }]" />
        </div>
      </div>
    </template>
    <div v-html="comment.text"></div>
    <div class="comment-footer">
      <div class="footer-left">
        <el-tag v-if="!comment.modChecked" type="warning" style="margin-right: 10px">Неотмодерирован</el-tag>
        <el-tag v-if="comment.positive" type="success">Отображается</el-tag>
        <el-tag v-else type="danger">Не отображается</el-tag>
      </div>
      <div class="footer-right">
        <el-button v-if="!comment.modChecked || !comment.positive" type="success" size="mini" icon="el-icon-success" @click="markPositive"
          >Отображать</el-button
        >
        <el-button v-if="!comment.modChecked || comment.positive" type="danger" size="mini" icon="el-icon-error" @click="markNegative"
          >Не Отображать</el-button
        >
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import Comment from '@/classes/Comment';
import Rating from '@/components/Rating.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'AdminCommentCard',
  components: { Rating },
  props: {
    comment: {
      type: Object as PropType<Comment>,
      required: true,
    },
  },
  setup(props) {
    const markPositive = () => {
      Provider.store.commit('comments/markPositive', props.comment);
      Provider.store.dispatch('comments/modChecked', props.comment);
    };
    const markNegative = () => {
      Provider.store.commit('comments/markNegative', props.comment);
      Provider.store.dispatch('comments/modChecked', props.comment);
    };
    return {
      markPositive,
      markNegative,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
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
  // max-width: 1400px;
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
