<template>
  <el-carousel
    ref="carouselRef"
    v-touch:swipe="(direction) => $carouselSwipe(direction, carouselRef)"
    :interval="5000"
    indicator-position="outside"
    height="350px"
  >
    <el-carousel-item v-for="(socialMedias, i) in carousel" :key="i">
      <div v-for="item in socialMedias" :key="item.description" class="size"><SocialMediaCard :item="item" /></div>
    </el-carousel-item>
  </el-carousel>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

import SocialMediaCard from '@/components/SocialMediaCard.vue';
import ISocialMedia from '@/interfaces/ISocialMedia';
import makeCarousel from '@/services/MakeCarousel';

export default defineComponent({
  name: 'SocialMediaCarousel',
  components: { SocialMediaCard },
  props: {
    socialMedias: {
      type: Array as PropType<ISocialMedia[]>,
      default: () => [],
    },
  },
  setup(props) {
    const carousel: Ref<ISocialMedia[][]> = ref([]);
    const mounted: Ref<boolean> = ref(false);
    const carouselRef = ref();

    onBeforeMount(async () => {
      carousel.value = makeCarousel<ISocialMedia>(props.socialMedias, 5);
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

<style lang="scss" scoped>
@media screen and (max-width: 980px) {
  .size {
    width: 170px;
  }
}

@media screen and (max-width: 480px) {
  :deep(.main-page-container-header-title) {
    margin-left: 15px;
    letter-spacing: 0;
    font-size: 18px;
  }
}
</style>
