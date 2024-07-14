<template>
  <component
    :is="'MainContainer'"
    v-if="mounted && carousel.length"
    header-title="Статьи"
    header-button-title="Все статьи"
    header-button-link="/news"
  >
    <el-carousel
      ref="carouselRef"
      v-touch:swipe="(direction) => $carouselSwipe(direction, carouselRef)"
      :interval="5000"
      indicator-position="outside"
      height="350px"
    >
      <el-carousel-item v-for="(news, i) in carousel" :key="i">
        <NewsCard v-for="item in news" :key="item.id" :news="item" :article="true" />
      </el-carousel-item>
    </el-carousel>
  </component>
</template>

<script lang="ts">
import News from '@/classes/News';
import MainContainer from '@/components/Main/MainContainer.vue';
import NewsCard from '@/components/News/NewsCard.vue';
import makeCarousel from '@/services/MakeCarousel';

export default defineComponent({
  name: 'MainArticles',
  components: { MainContainer, NewsCard },

  setup() {
    const news = NewsStore.Items();
    const carousel: Ref<News[][]> = ref([]);
    const mounted: Ref<boolean> = ref(false);
    const carouselRef = ref();

    onBeforeMount(async () => {
      NewsStore.ClearItems();
      // await Store.dispatch('news/getAllMain');
      // await Store.Commit('news/setFilteredNews');
      carousel.value = makeCarousel<News>(news, 4);
      mounted.value = true;
    });

    return {
      carousel,
      mounted,
      carouselRef,
    };
  },
});
</script>
