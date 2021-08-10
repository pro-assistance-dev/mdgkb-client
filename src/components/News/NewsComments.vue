<template>
  <el-card class="card-content comments">
    <template #header>
      <div class="card-header">
        <h3 class="title article-title">Комментарии</h3>
      </div>
    </template>

    <el-card v-for="comment in newsComments" :key="comment.id" class="comments-card">
      <div v-if="comment.userId === userId && isAuth" class="comment-buttons">
        <el-tooltip v-if="!comment.isEditing" content="Редактировать комментарий" placement="top-end">
          <el-button size="medium" icon="el-icon-edit" @click="editComment(comment.id)" />
        </el-tooltip>
        <el-popconfirm
          confirm-button-text="Да"
          cancel-button-text="Отмена"
          icon="el-icon-info"
          icon-color="red"
          title="Вы уверены, что хотите удалить комментарий?"
          @confirm="removeComment(comment.id)"
          @cancel="() => {}"
        >
          <template #reference>
            <el-button size="medium" icon="el-icon-delete" />
          </template>
        </el-popconfirm>
      </div>
      <div class="comment-header" align="justify">
        <span class="comment-email">{{ comment.user.email }}</span>
        <span class="comment-date">{{ $dateFormatRu(comment.publishedOn, true) }}</span>
      </div>
      <el-form v-if="comment.isEditing" ref="editCommentForm" :model="comment" :rules="rules">
        <el-form-item prop="text">
          <el-input
            ref="commentInput"
            v-model="comment.text"
            type="textarea"
            placeholder="Добавьте комментарий"
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
            <el-button size="mini" type="primary" icon="el-icon-folder-checked" @click="saveCommentChanges(comment)"> Сохранить </el-button>
          </div>
        </el-form-item>
      </el-form>
      <div v-else>
        {{ comment.text }}
      </div>
    </el-card>

    <div class="add-comment">
      <el-form ref="commentForm" :key="isAuth" :model="comment" :rules="isAuth ? rules : null">
        <el-form-item prop="text">
          <el-input
            ref="commentInput"
            v-model="comment.text"
            type="textarea"
            placeholder="Добавьте комментарий"
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
              Отправить комментарий
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, PropType, ref } from 'vue';
import { useStore } from 'vuex';

import CommentRules from '@/classes/news/CommentRules';
import NewsComment from '@/classes/news/NewsComment';
import INewsComment from '@/interfaces/news/INewsComment';
import INewsImage from '@/interfaces/news/INewsImage';

export default defineComponent({
  name: 'NewsComments',
  props: {
    newsComments: {
      type: Array as PropType<Array<INewsImage>>,
      required: true,
    },
  },
  async setup() {
    let comment = ref(new NewsComment());
    const commentInput = ref();
    const store = useStore();
    const news = computed(() => store.getters['news/newsItem']);

    const userId = computed(() => store.getters['auth/user']?.id);
    const userEmail = computed(() => localStorage.getItem('userEmail'));
    const isAuth = computed(() => store.getters['auth/isAuth']);

    const commentForm = ref();
    const editCommentForm = ref();
    const rules = ref(CommentRules);

    const sendComment = async (item: INewsComment) => {
      let validationResult;
      commentForm.value.validate((valid: any) => {
        validationResult = !!valid;
      });
      if (!validationResult) return;
      item.newsId = news.value.id;
      if (userEmail.value) item.user.email = userEmail.value;
      if (userId.value) item.userId = userId.value;
      try {
        await store.dispatch('news/createComment', item);
        comment.value = new NewsComment();
      } catch (e) {
        ElMessage({ message: 'Что-то пошло не так', type: 'error' });
        return;
      }
    };

    const removeComment = async (commentId: string) => {
      await store.dispatch('news/removeComment', commentId);
    };
    const editComment = async (commentId: string) => {
      await store.dispatch('news/editComment', commentId);
    };
    const saveCommentChanges = async (item: INewsComment) => {
      let validationResult;
      editCommentForm.value.validate((valid: any) => {
        validationResult = !!valid;
      });
      if (!validationResult) return;
      try {
        await store.dispatch('news/updateComment', item);
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
      news,
      isAuth,
      commentInput,
      commentForm,
      editComment,
      saveCommentChanges,
      editCommentForm,
    };
  },
});
</script>

<style scoped lang="scss">
$side-cotainer-max-width: 300px;
$news-content-max-width: 800px;
$card-margin-size: 30px;

.news-page-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: $card-margin-size 0;
}

.side-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: $side-cotainer-max-width;
  margin-right: $card-margin-size;

  .side-item {
    margin-bottom: $card-margin-size;
  }
}

.news-content-container {
  max-width: $news-content-max-width;
  width: 100%;
}

.add-comment {
  margin: 50px 0 50px 0;
}

.box-card {
  margin: 10px 0 10px 0;
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
  margin: $card-margin-size 0 0 0;
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

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.article-footer-item {
  padding: 10px;
}

@media only screen and (max-width: 992px) {
  .article-footer {
    flex-direction: column-reverse;
  }
}

.recent-news-item {
  display: flex;
  flex-direction: column;

  .item-title {
    font-weight: 600;
  }

  .item-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
  }

  .icon {
    user-select: none;
    display: flex;
    align-items: center;
    transition: all 0.2s;
    margin-right: 3px;
  }

  .anticon {
    padding-right: 5px;
    font-size: 16px;
  }
}

:deep(.cell-row) {
  cursor: pointer;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  :deep(.el-tag) {
    margin: 5px;
  }
}

:deep(img) {
  max-width: 760px;
}

.news-image-container {
  margin-bottom: $card-margin-size;
  img {
    width: 100%;
    max-height: $news-content-max-width / 2;
  }
}
</style>
