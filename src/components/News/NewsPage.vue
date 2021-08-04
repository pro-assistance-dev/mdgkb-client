<template>
  <div class="news-page-container">
    <div class="side-container hidden-md-and-down">
      <div class="side-item">
        <NewsCalendar />
      </div>
      <div class="side-item">
        <el-card>
          <el-table :data="recentNewsList" cell-class-name="cell-row">
            <el-table-column header-align="center">
              <template #header>
                <h3>Читайте также</h3>
              </template>
              <template #default="scope">
                <div class="recent-news-item" @click="$router.push(`/news/${scope.row.slug}`)">
                  <div class="item-title">{{ scope.row.title }}</div>
                  <div class="item-footer">
                    <div class="icon">
                      <EyeOutlined />
                      <span>0 </span>
                    </div>
                    <div class="item-date">{{ $dateFormatRu(scope.row.publishedOn, true) }}</div>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </div>
    <div class="news-content-container">
      <el-card class="card-content news">
        <template #header>
          <div class="card-header">
            <h2 class="title article-title">{{ news.title }}</h2>
          </div>
        </template>

        <div class="article-body" v-html="newsContent"></div>

        <el-divider />
        <div class="article-footer">
          <div class="article-footer-item">
            <el-button @click="$router.push('/')" style="height: 20px">Вернуться назад</el-button>
          </div>
          <div class="tags-container article-footer-item">
            <el-tag effect="plain" @click.stop="filterNews(tag.id)" class="tag-link" v-for="tag in news.tags" :key="tag.id" size="small">
              {{ tag.label }}
            </el-tag>
          </div>
          <div class="right-footer article-footer-item">
            <NewsMeta :news="news" :newsPage="true" />
          </div>
        </div>
      </el-card>

      <el-card class="card-content comments">
        <template #header>
          <div class="card-header">
            <h3 class="title article-title">Комментарии</h3>
          </div>
        </template>

        <el-card class="comments-card" v-for="comment in news.newsComments" :key="comment.id">
          <div class="comment-buttons" v-if="comment.userId === userId && isAuth">
            <el-tooltip content="Редактировать комментарий" placement="top-end" v-if="!comment.isEditing">
              <el-button size="medium" icon="el-icon-edit" @click="editComment(comment.id)" />
            </el-tooltip>
            <el-popconfirm
              confirmButtonText="Да"
              cancelButtonText="Отмена"
              icon="el-icon-info"
              iconColor="red"
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
          <el-form ref="editCommentForm" :model="comment" :rules="rules" v-if="comment.isEditing">
            <el-form-item prop="text">
              <el-input
                ref="commentInput"
                type="textarea"
                placeholder="Добавьте комментарий"
                v-model="comment.text"
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
                <el-button size="mini" type="primary" icon="el-icon-folder-checked" @click="saveCommentChanges(comment)">
                  Сохранить
                </el-button>
              </div>
            </el-form-item>
          </el-form>
          <div v-else>
            {{ comment.text }}
          </div>
        </el-card>

        <div class="add-comment">
          <el-form ref="commentForm" :model="comment" :rules="rules">
            <el-form-item prop="text">
              <el-input
                ref="commentInput"
                type="textarea"
                placeholder="Добавьте комментарий"
                v-model="comment.text"
                @focus="isAuth ? null : openLoginModal()"
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
                <el-button class="send-comment" type="primary" @click="isAuth ? sendComment(comment) : openLoginModal()">
                  Отправить комментарий
                </el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { computed, defineComponent, ref, watch } from 'vue';
import { EyeOutlined } from '@ant-design/icons-vue';
import NewsCalendar from '@/components/News/NewsCalendar.vue';
import NewsComment from '@/classes/news/NewsComment';
import INewsComment from '@/interfaces/news/INewsComment';
import NewsMeta from '@/components/News/NewsMeta.vue';
import CommentRules from '@/classes/news/CommentRules';
import INews from '@/interfaces/news/INews';
import { ElMessage } from 'element-plus';

export default defineComponent({
  name: 'NewsList',
  components: { NewsMeta, NewsCalendar, EyeOutlined },

  async setup() {
    let comment = ref(new NewsComment());
    const commentInput = ref();
    const store = useStore();
    const route = useRoute();
    const slug = computed(() => route.params['slug']);
    const news = computed(() => store.getters['news/newsItem']);

    const userId = computed(() => store.getters['auth/user']?.id);
    const userEmail = computed(() => localStorage.getItem('userEmail'));
    const isAuth = computed(() => store.getters['auth/isAuth']);

    watch(slug, () => {
      if (slug.value) {
        store.dispatch('news/get', slug.value);
        window.scrollTo(0, 0);
      }
    });
    await store.dispatch('news/get', slug.value);
    await store.dispatch('news/getAll', news.value.publishedOn);
    const recentNewsList = store.getters['news/news'].slice(0, 5);
    const newsContent = computed(() =>
      news.value.content ? news.value.content : '<p style="text-align: center">Описание отсутствует</p>'
    );

    const commentForm = ref();
    const editCommentForm = ref();
    const rules = ref(CommentRules);

    const sendComment = async (item: INewsComment) => {
      let validationResult;
      commentForm.value.validate((valid: any) => {
        if (valid) {
          validationResult = true;
        } else {
          validationResult = false;
        }
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
        if (valid) {
          validationResult = true;
        } else {
          validationResult = false;
        }
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
      newsContent,
      recentNewsList,
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
</style>
