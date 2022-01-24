<template>
  <div>
    <div class="card-header">
      <h3>{{ !isReviews ? 'Комментарии' : 'Отзывы' }} ({{ comments.length }}):</h3>
    </div>

    <el-card v-for="item in comments" :key="item.comment.id" class="comments-card">
      <div v-if="item.comment.userId === userId && isAuth" class="comment-buttons">
        <el-tooltip
          v-if="!item.comment.isEditing"
          :content="!isReviews ? 'Редактировать комментарий' : 'Редактировать отзыв'"
          placement="top-end"
        >
          <el-button size="medium" icon="el-icon-edit" @click="editComment(item.comment.id)" />
        </el-tooltip>
        <el-popconfirm
          confirm-button-text="Да"
          cancel-button-text="Отмена"
          icon="el-icon-info"
          icon-color="red"
          :title="!isReviews ? 'Вы уверены, что хотите удалить комментарий?' : 'Вы уверены, что хотите удалить отзыв?'"
          @confirm="removeComment(item.id)"
          @cancel="() => {}"
        >
          <template #reference>
            <el-button size="medium" icon="el-icon-delete" />
          </template>
        </el-popconfirm>
      </div>
      <div class="comment-header" align="justify">
        <span class="comment-email">{{ item.comment.user.email }}</span>
        <span class="comment-date">{{ $dateFormatRu(item.comment.publishedOn, true) }}</span>
      </div>
      <el-form v-if="item.comment.isEditing" ref="editCommentForm" :model="item" :rules="rules">
        <el-form-item prop="text">
          <el-input
            ref="commentInput"
            v-model="item.comment.text"
            type="textarea"
            :placeholder="!isReviews ? 'Оставьте комментарий' : 'Оставьте отзыв'"
            minlength="5"
            maxlength="500"
            show-word-limit
            :autosize="{ minRows: 3, maxRows: 6 }"
          >
            <template #suffix>
              <i class="el-icon-edit el-input__icon"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div style="display: flex; justify-content: flex-end">
            <el-button size="mini" type="primary" icon="el-icon-folder-checked" @click="saveCommentChanges(item)"> Сохранить </el-button>
          </div>
        </el-form-item>
      </el-form>
      <div v-else>
        {{ item.comment.text }}
      </div>
    </el-card>

    <div class="add-comment">
      <el-form ref="commentForm" :key="isAuth" :model="comment" :rules="isAuth ? rules : null">
        <el-form-item prop="comment.text">
          <el-rate v-if="isReviews" v-model="comment.comment.rating" />
          <el-input
            ref="commentInput"
            v-model="comment.comment.text"
            type="textarea"
            :placeholder="!isReviews ? 'Напишите комментарий:' : 'Напишите отзыв:'"
            minlength="5"
            maxlength="500"
            show-word-limit
            :autosize="{ minRows: 3, maxRows: 6 }"
            @focus="isAuth ? null : openLoginModal()"
          >
            <template #suffix>
              <i class="el-icon-edit el-input__icon"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div style="display: flex; justify-content: flex-end">
            <el-button class="send-comment" type="primary" @click="isAuth ? sendComment(comment) : openLoginModal()">
              {{ !isReviews ? 'Отправить комментарий' : 'Отправить отзыв' }}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

import CommentRules from '@/classes/news/CommentRules';
import IDivisionComment from '@/interfaces/buildings/IDivisionComment';
import IComment from '@/interfaces/comments/IComment';
import IDoctorComment from '@/interfaces/IDoctorComment';
import INewsComment from '@/interfaces/news/INewsComment';
import validate from '@/mixins/validate';

export default defineComponent({
  name: 'NewsComments',
  props: {
    storeName: {
      type: String,
      required: true,
    },
    parentId: {
      type: String,
      required: true,
    },
    isReviews: {
      type: Boolean,
      default: false,
    },
  },
  async setup(prop) {
    const comment = computed(() => store.getters[`${prop.storeName}/comment`]);
    const commentInput = ref();
    const store = useStore();
    const comments: ComputedRef<IComment> = computed(() => store.getters[`${prop.storeName}/comments`]);

    const userId = computed(() => store.getters['auth/user']?.id);
    const userEmail = computed(() => store.getters['auth/user']?.email);
    const isAuth = computed(() => store.getters['auth/isAuth']);

    const commentForm = ref();
    const editCommentForm = ref();
    const rules = ref(CommentRules);

    const sendComment = async (item: INewsComment | IDivisionComment | IDoctorComment) => {
      if (!validate(commentForm)) return;
      store.commit(`${prop.storeName}/setParentIdToComment`, prop.parentId);
      if (userEmail.value) item.comment.user.email = userEmail.value;
      if (userId.value) item.comment.userId = userId.value;
      try {
        await store.dispatch(`${prop.storeName}/createComment`, item);
      } catch (e) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
      commentForm.value.clearValidate();
    };

    const removeComment = async (commentId: string) => {
      await store.dispatch(`${prop.storeName}/removeComment`, commentId);
    };
    const editComment = (commentId: string) => {
      store.commit(`${prop.storeName}/editComment`, commentId);
    };
    const saveCommentChanges = async (item: INewsComment | IDivisionComment | IDoctorComment) => {
      if (!validate(editCommentForm)) return;
      try {
        await store.dispatch(`${prop.storeName}/updateComment`, item);
      } catch (e) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
    };

    const openLoginModal = () => {
      if (!isAuth.value) {
        store.commit('auth/openModal', true);
        commentInput.value.blur();
      }
    };

    return {
      rules,
      openLoginModal,
      removeComment,
      userId,
      sendComment,
      comment,
      isAuth,
      commentInput,
      commentForm,
      editComment,
      saveCommentChanges,
      editCommentForm,
      comments,
    };
  },
});
</script>

<style scoped lang="scss">
.add-comment {
  // margin: 50px 0 50px 0;
}

h3 {
  text-align: left;
  margin-top: 0;
  color: black;
}
h3 {
  font-size: 20px;
}

.comments-card {
  position: relative;
  // margin: 20px 0 0 0;
  margin-bottom: 20px;
}

.comment-header {
  text-align: right;
  margin: 5px 0;
  .comment-email {
    float: left;
    font-weight: bold;
  }
  .comment-date {
    color: #4a4a4a;
    opacity: 0.75;
  }
}
.comment-buttons {
  position: absolute;
  z-index: 2;
  top: 5px;
  right: 5px;
  display: flex;
  :deep(.el-button) {
    padding: 5px;
    margin: 0 !important;
    min-height: unset;
    border: none;
  }
}

.card-content {
  margin-left: auto;
  margin-right: auto;
}

.card-header {
  text-align: center;
}

:deep(p) {
  text-align: justify;
}
.send-comment {
  margin-right: 0;
  border-radius: 10px;
  background-color: #2754eb;
  border-color: #2754eb;
  &:hover {
    background-color: darken(#2754eb, 10%);
  }
}
</style>
