<template>
  <div v-if="mounted" class="news-page-container">
    <div class="side-container hidden-md-and-down">
      <div class="side-item">
        <NewsCalendar />
      </div>
      <div class="side-item">
        <RecentNewsCard />
      </div>
      <div v-if="news.newsDoctors.length" class="side-item">
        <NewsDoctorsCard :news-doctors="news.newsDoctors" />
      </div>
    </div>
    <div class="news-content-container">
      <div class="card-item" style="padding: 30px">
        <div class="card-header">
          <h2 class="title article-title">{{ news.title }}</h2>
          <img v-if="news.mainImage.fileSystemPath" :src="news.mainImage.getImageUrl()" alt="alt" @error="errorImg" />
          <div class="image-comment">{{ news.mainImageDescription }}</div>
          <div class="article-preview">{{ news.previewText }}</div>
        </div>
        <div v-if="news.event" class="card-header event-registration-button">
          <EventRegistration store-name="news" :parent-id="news.id" />
        </div>
        <el-divider />

        <div class="article-body" v-html="newsContent"></div>
        <template v-if="news.newsImages.length > 0">
          <ImageGallery :images="news.newsImages" />
        </template>
        <el-divider />
        <NewsPageFooter :news="news" />
        <el-divider />
        <Comments store-name="news" :parent-id="news.id" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import CommentRules from '@/classes/news/CommentRules';
import NewsComment from '@/classes/news/NewsComment';
import Comments from '@/components/Comments.vue';
import ImageGallery from '@/components/ImageGallery.vue';
import EventRegistration from '@/components/News/EventRegistration.vue';
import NewsCalendar from '@/components/News/NewsCalendar.vue';
import NewsDoctorsCard from '@/components/News/NewsDoctorsCard.vue';
import NewsPageFooter from '@/components/News/NewsPageFooter.vue';
import RecentNewsCard from '@/components/News/RecentNewsCard.vue';
import INews from '@/interfaces/news/INews';

export default defineComponent({
  name: 'NewsList',
  components: { NewsDoctorsCard, NewsPageFooter, NewsCalendar, RecentNewsCard, ImageGallery, Comments, EventRegistration },

  async setup() {
    let comment = ref(new NewsComment());
    const commentInput = ref();
    const store = useStore();
    const route = useRoute();
    const mounted: Ref<boolean> = ref(false);
    const slug = computed(() => route.params['slug']);
    const news: ComputedRef<INews> = computed<INews>(() => store.getters['news/newsItem']);

    watch(slug, () => {
      if (slug.value) {
        store.dispatch('news/get', slug.value);
        window.scrollTo(0, 0);
      }
    });

    onBeforeMount(async () => {
      await store.dispatch('news/get', slug.value);
      await store.dispatch('news/getAll');
      mounted.value = true;
    });

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
.event-registration-button {
  margin: 15px 0;
}
</style>
