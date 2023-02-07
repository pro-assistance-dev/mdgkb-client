<template>
  <el-carousel
    v-if="mount"
    ref="carouselRef"
    v-touch:swipe="(direction) => $carouselSwipe(direction, carouselRef)"
    height="340px"
    autoplay
    :interval="5000"
  >
    <el-carousel-item v-for="item in slides" :key="item.id">
      <NewsCarouselSlide :item="item" />
    </el-carousel-item>
  </el-carousel>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';

import NewsSlide from '@/classes/newsSlides/NewsSlide';
import NewsCarouselSlide from '@/components/News/NewsCarouselSlide.vue';

export default defineComponent({
  name: 'NewsCarousel',
  components: { NewsCarouselSlide },
  setup() {
    const store = useStore();
    const slides: ComputedRef<NewsSlide[]> = computed(() => store.getters['newsSlides/items']);
    const carouselRef = ref();
    const mount = ref(false);
    onBeforeMount(async () => {
      await store.dispatch('newsSlides/getAll');
      mount.value = true;
    });

    return {
      slides,
      carouselRef,
      mount,
    };
  },
});
</script>
