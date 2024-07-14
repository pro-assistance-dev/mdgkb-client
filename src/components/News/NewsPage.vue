<template>
  <div v-if="mounted" class="news-page-container">
    <div class="side-container hidden-md-and-down">
      <div class="side-item">
        <SuggestionNews :key="$route.fullPath" />
      </div>
      <!--      <div v-if="news.newsDoctors.length" class="side-item">-->
      <!--        <NewsDoctorsCard :news-doctors="news.newsDoctors" />-->
      <!--      </div>-->
    </div>
    <div class="news-content-container">
      <div class="card-item">
        <div v-if="news" class="card-header">
          <h2 class="title article-title">{{ news.title }}</h2>
          <img v-if="news.mainImage.fileSystemPath" :src="news.mainImage.getImageUrl()" alt="news-image" @error="news.mainImage.errorImg" />
          <div class="image-comment">{{ news.mainImageDescription }}</div>
          <!-- <div class="article-preview">{{ news.previewText }}</div> -->
        </div>
        <div v-if="news.event && news.event.form.id" class="card-header action-container">
          <EventRegistration store-name="news" :parent-id="news.id" />
        </div>
        <div v-if="news.isArticle" class="card-header action-container">
          <a :href="news.articleLink">
            <el-button class="send-comment" type="primary"> Перейти к статье </el-button>
          </a>
        </div>

        <div class="article-body" v-html="newsContent.replaceAll('<video', '<iframe').replaceAll('/video>', '/iframe>')"></div>
        <template v-if="news.newsImages.length > 0">
          <CarouselImagesNews :key="news.id" :images="news.newsImages" :height="`${mobileWindow}px`" @openModalWindow="openModalWindow" />
          <!-- <ImageGallery_new :key="news.id" :images="news.newsImages" :quantity="2" /> -->
        </template>
        <el-divider />
        <NewsPageFooter v-if="news" :news="news" />
        <el-divider />
        <Comments :comments="news.comments" v-if="news.id" domen="news" :item-id="news.id" :is-reviews="false" />
      </div>
    </div>
  </div>
  <Close />
</template>

<script setup lang="ts">
import Close from '@/assets/svg/Filter/Close.svg';
import News from '@/classes/News';
import Comments from '@/components/Comments/Comments.vue';
import EventRegistration from '@/components/News/EventRegistration.vue';
import NewsPageFooter from '@/components/News/NewsPageFooter.vue';
import Hooks from '@/services/Hooks/Hooks';

const SuggestionNews = defineAsyncComponent({
  loader: () => import('@/components/News/SuggestionNews.vue' /* webpackChunkName: "mainReviews" */),
  delay: 100,
});

const mounted: Ref<boolean> = ref(false);
const id = computed(() => Router.Id());
const news: News = NewsStore.Item();
const modalOpen: Ref<boolean> = ref(false);
const mobileWindow = ref(
  window.innerWidth < 1600 ? (window.innerWidth < 600 ? window.innerWidth / 1.6 : window.innerWidth / 2.5) : window.innerWidth / 3.5
);

watch(id, async () => {
  await load();
});

const load = async () => {
  await NewsStore.Get(Router.Id());
  mounted.value = true;
  window.scrollTo(0, 0);
};

Hooks.onBeforeMount(load);

const newsContent = computed(() => (news.content ? news.content : '<p style="text-align: center">Описание отсутствует</p>'));

const openModalWindow = async () => {
  modalOpen.value = true;
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
$side-cotainer-max-width: 300px;
$news-content-max-width: 1000px;
$card-margin-size: 30px;

.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 3;
}

.modal-box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: space-between;
  background: white;
  max-width: 1344px;
  width: calc(100% - 40px);
  padding: 20px;
  z-index: 4;
  border-radius: 10px;
}

.field {
  position: relative;
  height: 360px;
  overflow: hidden;
  box-sizing: border-box;
}

.icon-close {
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  fill: #343e5c;
  cursor: pointer;
  transition: 0.3s;
  padding: 20px;
}

.icon-close:hover {
  fill: #205bb8;
}

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
    margin: 10px 0;
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

:deep(.article-body) {
  img {
    max-width: 100%;
  }

  video,
  iframe {
    width: 100%;
    min-height: 500px;
  }
}

:deep(.leave-a-review) {
  padding: 40px 190px 35px 175px;
}

@media screen and (max-width: 1024px) {
  :deep(.leave-a-review) {
    padding: 20px;
  }

  :deep(.article-body) {
    video,
    iframe {
      min-height: 400px;
    }
  }
}

@media screen and (max-width: 768px) {
  :deep(.leave-a-review) {
    padding: 20px;
  }

  :deep(.article-body) {
    video,
    iframe {
      min-height: 300px;
    }
  }

  .modal-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    align-items: center;
    justify-content: space-between;
    background: white;
    max-width: 1344px;
    width: calc(100% - 20px);
    padding: 10px;
    z-index: 4;
    border-radius: 10px;
  }
}

@media screen and (max-width: 480px) {
  .card-item {
    padding: 10px;
  }

  .modal-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    align-items: center;
    justify-content: space-between;
    background: white;
    max-width: 1344px;
    width: calc(100% - 10px);
    padding: 5px;
    z-index: 4;
    border-radius: 10px;
  }
}

@media screen and (max-width: 400px) {
  :deep(.leave-a-review) {
    padding: 10px;
  }
}
</style>
