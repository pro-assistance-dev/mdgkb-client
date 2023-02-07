<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="Desktop" name="Desktop">
      <div class="desktop-preview">
        <NewsCarouselSlide :item="slide" :width="1920" />
      </div>
    </el-tab-pane>
    <el-tab-pane label="Laptop" name="Laptop">
      <div class="laptop-preview">
        <NewsCarouselSlide :item="slide" :width="1200" />
      </div>
    </el-tab-pane>
    <el-tab-pane label="Tablet" name="Tablet">
      <div class="tablet-preview">
        <NewsCarouselSlide :item="slide" :width="768" />
      </div>
    </el-tab-pane>
    <el-tab-pane label="Mobile" name="Mobile">
      <div class="mobile-preview">
        <NewsCarouselSlide :item="slide" :width="480" />
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import NewsSlide from '@/classes/newsSlides/NewsSlide';
import NewsCarouselSlide from '@/components/News/NewsCarouselSlide.vue';

export default defineComponent({
  name: 'AdminNewsSlidePreview',
  components: { NewsCarouselSlide },
  setup() {
    const store = useStore();
    const activeName: Ref<string> = ref<string>('Desktop');
    const slide: ComputedRef<NewsSlide> = computed<NewsSlide>(() => store.getters['newsSlides/item']);

    return {
      slide,
      activeName,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.desktop-preview) {
  max-width: 1920px;
  width: 100%;
}
:deep(.laptop-preview) {
  max-width: 1200px;
  width: 100%;
}
:deep(.tablet-preview) {
  max-width: 768px;
  width: 100%;
}
:deep(.mobile-preview) {
  max-width: 480px !important;
  width: 100%;
}
</style>
