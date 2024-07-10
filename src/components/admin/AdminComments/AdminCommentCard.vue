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
        <el-tag v-if="!comment.modChecked" type="warning" style="margin-right: 10px">Не отмодерирован</el-tag>
        <el-tag v-if="comment.positive" type="success">Отображается</el-tag>
        <el-tag v-else type="danger">Не отображается</el-tag>
      </div>
      <div class="footer-right">
        <PButton
          v-if="!comment.modChecked || !comment.positive"
          skin="profile"
          type="success"
          text="Отображать"
          margin="0 10px 0 0"
          @click="markPositive"
        />
        <PButton v-if="!comment.modChecked || comment.positive" skin="profile" color="danger" text="Не отображать" @click="markNegative" />
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import Comment from '@/classes/Comment';

const props = defineProps({
  comment: {
    type: Object as PropType<Comment>,
    required: true,
  },
});

const markPositive = async () => {
  props.comment.markPositive();
  await CommentsStore.Update(props.comment);
};
const markNegative = async () => {
  props.comment.markNegative();
  await CommentsStore.Update(props.comment);
};
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

.footer-right {
  display: flex;
  justify-content: right;
  align-items: center;
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
