<template>
  <el-carousel v-if="mount" height="340px" autoplay :interval="5000" indicator-position="outside">
    <el-carousel-item v-for="item in slides" :key="item.id">
      <NewsCarouselSlide :item="item" />
    </el-carousel-item>
  </el-carousel>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';

import NewsCarouselSlide from '@/components/News/NewsCarouselSlide.vue';
import INewsSlide from '@/interfaces/newsSlides/INewsSlide';

export default defineComponent({
  name: 'NewsCarousel',
  components: { NewsCarouselSlide },
  setup() {
    const store = useStore();
    const slides: ComputedRef<INewsSlide[]> = computed(() => store.getters['newsSlides/items']);
    const mount = ref(false);
    onBeforeMount(async () => {
      await store.dispatch('newsSlides/getAll');
      mount.value = true;
    });

    return {
      slides,
      mount,
    };
  },
});
</script>
