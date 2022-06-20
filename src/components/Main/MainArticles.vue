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
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import MainContainer from '@/components/Main/MainContainer.vue';
import NewsCard from '@/components/News/NewsCard.vue';
import INews from '@/interfaces/news/INews';
import makeCarousel from '@/services/MakeCarousel';

export default defineComponent({
  name: 'MainArticles',
  components: { MainContainer, NewsCard },

  setup() {
    const store = useStore();
    const news = computed(() => store.getters['news/news']);
    const carousel: Ref<INews[][]> = ref([]);
    const mounted: Ref<boolean> = ref(false);
    const carouselRef = ref();

    onBeforeMount(async () => {
      store.commit('news/clearNews');
      // await store.dispatch('news/getAllMain');
      await store.commit('news/setFilteredNews');
      carousel.value = makeCarousel<INews>(news.value, 4);
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
