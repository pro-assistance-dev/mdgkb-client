<template>
  <el-card class="card-content">
    <template #header>
      <div class="card-header">
        <h1 class="title article-title">{{ news.title }}</h1>
        <div class="tags has-addons level-news">
          <el-tag effect="plain">{{ news.category.name }}</el-tag>
          <el-tag type="success" effect="dark">{{ $dateFormatRu(news.publishedOn) }}</el-tag>
        </div>
      </div>
    </template>

    <div class="content article-body" v-html="news.content"></div>

    <div class="content article-body">
      <el-button @click="$router.push('/')">Вернуться назад</el-button>
    </div>
  </el-card>

  <el-card class="card-content comments">
    <template #header>
      <div class="card-header">
        <h2 class="title article-title">Комментарии</h2>
      </div>
    </template>

    <el-card class="comments-list" v-for="comment in news.newsComments" :key="comment.id">
      <div class="comment-header" align="justify">
        <span class="comment-email">{{ comment.user.email }}</span>
        <span class="comment-date">{{ $dateFormatRu(comment.publishedOn, true) }}</span>
      </div>
      <div>
        {{ comment.text }}
      </div>
    </el-card>

    <div class="add-comment">
      <el-form :model="comment">
        <el-form-item label="Комментарий" prop="text">
          <el-input type="textarea" :rows="2" placeholder="Добавьте комментарий" v-model="comment.text"> </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="send-comment" type="primary" @click="sendComment(comment)">Отправить комментарий</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { computed, defineComponent, ref } from 'vue';
import NewsComment from '@/classes/news/NewsComment';
import INewsComment from '@/interfaces/news/INewsComment';

export default defineComponent({
  name: 'NewsList',
  async setup() {
    let comment = ref(new NewsComment());
    const store = useStore();
    const route = useRoute();
    await store.dispatch('news/get', route.params['slug']);
    const news = computed(() => store.getters['news/newsItem']);

    const sendComment = async (item: INewsComment) => {
      const userId = localStorage.getItem('userId');
      item.newsId = news.value.id;

      if (userId) item.userId = userId;
      await store.dispatch('news/createComment', item);
      comment.value = new NewsComment();
    };

    return {
      sendComment,
      comment,
      news,
    };
  },
});
</script>

<style scoped lang="scss">
.add-comment {
  margin: 50px 0 50px 0;
}

.box-card {
  margin: 10px 0 10px 0;
}

.comments {
  margin: 50px 0 0 0;
  .comments-list {
    margin: 20px 0 0 0;
  }
}

.comment-header {
  text-align: right;
  .comment-email {
    float: left;
    font-weight: bold;
  }
}

.send-comment {
  margin-right: 0;
}

.card-content {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
}

.card-header {
  text-align: center;
}
</style>
