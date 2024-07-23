<template>
  <div class="footer-top">
    <div class="container">
      <el-carousel
        v-if="mounted"
        ref="carouselRef"
        v-touch:swipe="(direction: string) => $carouselSwipe(direction, carouselRef)"
        :interval="5000"
      >
        <el-carousel-item v-for="(bannersGroup, i) in carousel" :key="i">
          <div v-for="item in bannersGroup" :key="item.id" class="image">
            <a :href="item.link ? `http://${item.link}` : ''">
              <img v-if="item.fileInfo.fileSystemPath" :src="item.fileInfo.getImageUrl()" :alt="item.name" />
            </a>
          </div>
        </el-carousel-item>
      </el-carousel>
      <el-row> </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Banner from '@/classes/Banner';
import makeCarousel from '@/services/MakeCarousel';

const banners = BannersStore.Items();
const carousel: Ref<Banner[][]> = ref([]);
const mounted = ref(false);
const carouselRef = ref();

const loadBanners = async () => {
  await BannersStore.GetAll();
  carousel.value = makeCarousel<Banner>(banners, 4);
  mounted.value = true;
};

onMounted(loadBanners);
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base-style.scss';
:deep(.el-carousel__item) {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

:deep(.el-carousel__container) {
  max-height: 200px;

  @media only screen and (max-width: 992px) {
    max-height: unset;
  }
}

img {
  max-height: 150px;
  &:hover {
    transform: scale(1.01);
    //   box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
}
</style>
