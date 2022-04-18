<template>
  <component :is="'MainContainer'" header-title="Статьи" header-button-title="Все статьи" header-button-link="/news">
    <el-carousel v-if="mounted" :interval="5000" indicator-position="outside" height="350px">
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

export default defineComponent({
  name: 'MainArticles',
  components: { MainContainer, NewsCard },

  setup() {
    const store = useStore();
    const news = computed(() => store.getters['news/news']);
    const carousel: Ref<INews[][]> = ref([]);
    const mounted: Ref<boolean> = ref(false);

    const makeCarousel = (array: INews[], size: number): INews[][] => {
      // size - number of banners in el-carousel-item
      const subarray = [];
      for (let i = 0; i < Math.ceil(array.length / size); i++) {
        subarray[i] = array.slice(i * size, i * size + size);
      }
      return subarray;
    };

    onBeforeMount(async () => {
      store.commit('news/clearNews');
      await store.dispatch('news/getAllMain');
      await store.commit('news/setFilteredNews');
      carousel.value = makeCarousel(news.value, 4);
      mounted.value = true;
    });

    return {
      carousel,
      mounted,
    };
  },
});
</script>
<style lang="scss" scoped>
@media screen and (max-width: 480px) {
  :deep(.main-page-container-header-title) {
    margin-left: 15px;
    letter-spacing: 0;
    font-size: 18px;
  }

  :deep(.main-page-container-header button) {
    font-size: 12px;
    margin: 0px;
  }

  :deep(.el-icon) {
    width: 0.5em;
    height: 0.5em;
  }
  :deep(.el-icon svg) {
    width: 0.5em;
    height: 0.5em;
    padding-bottom: 6px;
  }
}
</style>
