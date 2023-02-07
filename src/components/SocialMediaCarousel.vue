<template>
  <!-- <CollapsContainer tab-id="134" :collapsed="false">
    <template #inside-title>
      <div class="title-in">Видео отделения</div>
    </template>
    <template #inside-content> -->
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
  <!-- </template>
  </CollapsContainer> -->
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';

// import CollapsContainer from '@/components/Main/CollapsContainer/CollapsContainer.vue';
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
