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

import SocialMedia from '@/classes/SocialMedia';
import SocialMediaCard from '@/components/SocialMediaCard.vue';
import ArraysService from '@/services/Arrays';
import makeCarousel from '@/services/MakeCarousel';

export default defineComponent({
  name: 'SocialMediaCarousel',
  components: { SocialMediaCard },
  props: {
    socialMedias: {
      type: Array as PropType<SocialMedia[]>,
      default: () => [],
    },
  },
  setup(props) {
    const carousel: Ref<SocialMedia[][]> = ref([]);
    const carouselRef = ref();

    onBeforeMount(async () => {
      ArraysService.shuffle(props.socialMedias);
      carousel.value = makeCarousel<SocialMedia>(props.socialMedias, 5);
    });

    return {
      carousel,
      carouselRef,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.title-in {
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 22px;
  letter-spacing: 0.1em;
  color: $site_dark_gray;
  height: 60px;
  align-items: center;
  font-weight: bold;
}
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
