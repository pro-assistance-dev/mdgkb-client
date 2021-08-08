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
      <el-card class="news-image-container">
        <img @error="errorImg" v-if="news.mainImage.fileSystemPath" :src="news.mainImage.getImageUrl()" alt="alt" />
        <img v-else src="../../assets/img/310x310.png" />
      </el-card>

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

      <NewsGallery :newsImages="news.newsImages" />
      <NewsComments :newsComments="news.newsComments" />
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
import NewsMeta from '@/components/News/NewsMeta.vue';
import CommentRules from '@/classes/news/CommentRules';
import NewsGallery from '@/components/News/NewsGallery.vue';
import NewsComments from '@/components/News/NewsComments.vue';
export default defineComponent({
  name: 'NewsList',
  components: { NewsMeta, NewsCalendar, EyeOutlined, NewsGallery, NewsComments },

  async setup() {
    let comment = ref(new NewsComment());
    const commentInput = ref();
    const store = useStore();
    const route = useRoute();
    const slug = computed(() => route.params['slug']);
    const news = computed(() => store.getters['news/newsItem']);

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

    return {
      rules,
      comment,
      news,
      newsContent,
      recentNewsList,
      commentInput,
      commentForm,
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
