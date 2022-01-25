<template>
  <component :is="'MainContainer'" v-if="mounted" header-title="Главные новости" header-button-title="Все новости">
    <div class="main-news-block">
      <div class="main-news-block-left">
        <MainBigNewsCard :news="news[7]" />
      </div>
      <div class="main-news-block-middle">
        <NewsCard :news="news[1]" :main="true" />
        <NewsCard :news="news[2]" :main="true" />
      </div>
      <div class="main-news-block-right">
        <RecentNewsCard :main="true" :news-number="5" />
      </div>
    </div>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import MainBigNewsCard from '@/components/Main/MainBigNewsCard.vue';
import MainContainer from '@/components/Main/MainContainer.vue';
import NewsCard from '@/components/News/NewsCard.vue';
import RecentNewsCard from '@/components/News/RecentNewsCard.vue';

export default defineComponent({
  name: 'MainNewsBlock',
  components: { MainContainer, NewsCard, MainBigNewsCard, RecentNewsCard },

  setup() {
    const store = useStore();
    const news = computed(() => store.getters['news/news']);
    const mounted: Ref<boolean> = ref(false);

    onBeforeMount(async () => {
      store.commit('news/clearNews');
      await store.dispatch('news/getAllMain');
      await store.commit('news/setFilteredNews');
      mounted.value = true;
    });

    return {
      news,
      mounted,
    };
  },
});
</script>

<style lang="scss" scoped>
.main-news-block {
  display: flex;
  justify-content: space-between;
  height: 100%;
  &-middle {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &-right {
    width: 270px;
  }
}
</style>
