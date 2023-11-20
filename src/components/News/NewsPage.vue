<template>
  <div v-if="mounted" class="news-page-container">
    <div class="side-container hidden-md-and-down">
      <div class="side-item">
        <RecentNewsCard :key="$route.fullPath" />
      </div>
      <!--      <div v-if="news.newsDoctors.length" class="side-item">-->
      <!--        <NewsDoctorsCard :news-doctors="news.newsDoctors" />-->
      <!--      </div>-->
    </div>
    <div class="news-content-container">
      <div class="card-item">
        <div class="card-header">
          <h2 class="title article-title">{{ news.title }}</h2>
          <img v-if="news.mainImage.fileSystemPath" :src="news.mainImage.getImageUrl()" alt="news-image" @error="news.mainImage.errorImg" />
          <div class="image-comment">{{ news.mainImageDescription }}</div>
          <div class="article-preview">{{ news.previewText }}</div>
        </div>
        <div v-if="news.event && news.event.form.id" class="card-header action-container">
          <EventRegistration store-name="news" :parent-id="news.id" />
        </div>
        <div v-if="news.isArticle" class="card-header action-container">
          <a :href="news.articleLink">
            <el-button class="send-comment" type="primary"> Перейти к статье </el-button>
          </a>
        </div>
        <el-divider />

        <div class="article-body" v-html="newsContent"></div>
        <template v-if="news.newsImages.length > 0">
          <ImageGallery_new :images="news.newsImages" :quantity="2" />
        </template>
        <el-divider />
        <NewsPageFooter :news="news" />
        <el-divider />
        <Comments v-if="news.id" store-module="news" :parent-id="news.id" :is-reviews="false" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref, watch } from 'vue';

import CommentRules from '@/classes/news/CommentRules';
import News from '@/classes/news/News';
import NewsComment from '@/classes/news/NewsComment';
import Comments from '@/components/Comments/Comments.vue';
import ImageGallery_new from '@/components/ImageGallery_new.vue';
import EventRegistration from '@/components/News/EventRegistration.vue';
import NewsPageFooter from '@/components/News/NewsPageFooter.vue';
import RecentNewsCard from '@/components/News/RecentNewsCard.vue';
import Hooks from '@/services/Hooks/Hooks';
import NewsFiltersLib from '@/services/Provider/libs/filters/NewsFiltersLib';
import NewsSortsLib from '@/services/Provider/libs/sorts/NewsSortsLib';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'NewsList',
  components: { NewsPageFooter, RecentNewsCard, ImageGallery_new, EventRegistration, Comments },

  async setup() {
    let comment = ref(new NewsComment());
    const commentInput = ref();
    const mounted: Ref<boolean> = ref(false);
    const slug = computed(() => Provider.route().params['slug']);
    const news: ComputedRef<News> = computed<News>(() => Provider.store.getters['news/item']);

    watch(slug, async () => {
      console.log(slug);
      if (slug.value) {
        await load();
      }
    });

    const load = async () => {
      await Provider.store.dispatch('news/get', slug.value);
      await loadRelatedNews();
      mounted.value = true;
      window.scrollTo(0, 0);
    };

    const loadRelatedNews = async () => {
      Provider.resetFilterQuery();
      Provider.filterQuery.value.pagination.limit = 3;
      Provider.setSortModels(NewsSortsLib.byViewsCount(), NewsSortsLib.byPublishedOn());
      Provider.setFilterModels(NewsFiltersLib.onlyPublished(), NewsFiltersLib.excludeSlug(slug.value as string));
      Provider.setFilterModels(NewsFiltersLib.onlyPublished(), NewsFiltersLib.excludeSlug(slug.value as string));
      const filtersIds = news.value.getTagsIds();
      if (filtersIds.length > 0) {
        Provider.setFilterModels(NewsFiltersLib.filterByTags(filtersIds));
      }
      await Provider.store.dispatch('news/getAll', Provider.filterQuery.value);
    };

    Hooks.onBeforeMount(load);

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
      mounted,
      newsContent,
      commentInput,
      commentForm,
      editCommentForm,
    };
  },
});
</script>

<style scoped lang="scss">
$side-cotainer-max-width: 300px;
$news-content-max-width: 1000px;
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
  margin-top: 0;
  color: black;
  text-align: center;
}
h3 {
  font-size: 20px;
}

.card-content {
  margin-left: auto;
  margin-right: auto;
}

.card-header {
  img {
    width: 100%;
    border-radius: 5px;
    // max-height: $news-content-max-width / 2;
  }
  .image-comment {
    color: #b4b9ca;
    margin-left: 5px;
    font-size: 14px;
  }
  .article-preview {
    margin-top: 10px;
  }
}

:deep(p) {
  text-align: justify;
}

.news-image-container {
  margin-bottom: $card-margin-size;
  img {
    width: 100%;
  }
}
.action-container {
  margin: 15px 0;
  display: flex;
  justify-content: center;
  &-button {
    margin-right: 0;
    border-radius: 10px;
    background-color: #2754eb;
    border-color: #2754eb;
    &:hover {
      background-color: darken(#2754eb, 10%);
    }
  }
}

:deep(a) {
  color: inherit;
}

:deep(blockquote) {
  border-left: 5px solid #2467a6;
  margin-left: 0;
  padding-left: 50px;
}

:deep(.tab) {
  border: none;
}

:deep(.tab-name) {
  padding-left: 0px;
}

:deep(.tab-content-up) {
  padding: 0 20px;
}

.card-item {
  padding: 30px;
}

:deep(.leave-a-review) {
  padding: 40px 190px 35px 175px;
}

@media screen and (max-width: 1024px) {
  :deep(.leave-a-review) {
    padding: 20px;
  }
}

@media screen and (max-width: 480px) {
  .card-item {
    padding: 10px;
  }
}

@media screen and (max-width: 400px) {
  :deep(.leave-a-review) {
    padding: 10px;
  }
}
</style>
