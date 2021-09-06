<template>
  <el-card class="card-content comments">
    <template #header>
      <div class="card-header">
        <h3 class="title article-title">{{ !isReviews ? 'Комментарии' : 'Отзывы' }}</h3>
      </div>
    </template>

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
          <el-input
            ref="commentInput"
            v-model="comment.comment.text"
            type="textarea"
            :placeholder="!isReviews ? 'Оставьте комментарий' : 'Оставьте отзыв'"
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
  </el-card>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

import CommentRules from '@/classes/news/CommentRules';
import IDivisionComment from '@/interfaces/buildings/IDivisionComment';
import IDoctorComment from '@/interfaces/doctors/IDoctorComment';
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
    const comments = computed(() => store.getters[`${prop.storeName}/сomments`]);

    const userId = computed(() => store.getters['auth/user']?.id);
    const userEmail = computed(() => localStorage.getItem('userEmail'));
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
  margin: 50px 0 50px 0;
}

h2,
h3 {
  margin: 0;
  color: black;
}
h3 {
  font-size: 20px;
}

.comments {
  margin: 30px 0 0 0;
  .comments-card {
    position: relative;
    margin: 20px 0 0 0;
  }
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

.send-comment {
  margin-right: 0;
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
</style>
