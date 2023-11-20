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

import NewsSlide from '@/classes/NewsSlide';
import NewsCarouselSlide from '@/components/News/NewsCarouselSlide.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'NewsCarousel',
  components: { NewsCarouselSlide },
  setup() {
    const slides: ComputedRef<NewsSlide[]> = computed(() => Provider.store.getters['newsSlides/items']);
    const carouselRef = ref();
    const mount = ref(false);
    onBeforeMount(async () => {
      await Provider.store.dispatch('newsSlides/getAll');
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
