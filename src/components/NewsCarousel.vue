<template>
  <el-carousel :interval="3000" indicator-position="outside">
    <el-carousel-item v-for="item in carousel.carouselSlides" :key="item.id">
      <div class="carousel-container">
        <img :src="item.fileInfo.getImageUrl()" alt="alt" />
        <div class="carousel-body">
          <div class="carousel-title" v-html="item.title" />
          <div class="carousel-content" v-html="item.content"></div>
        </div>
        <button v-if="item.buttonShow" :style="{ background: item.buttonColor }" class="carousel-button" @click="$router.push(item.link)">
          Подробнее
        </button>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'NewsCarousel',
  async setup() {
    const store = useStore();
    const route = useRoute();
    let carousel = computed(() => store.getters['carousels/item']);
    const loadCarouselItem = async () => {
      await store.dispatch('carousels/getByKey', 'top');
      carousel = computed(() => store.getters['carousels/item']);
    };

    onMounted(loadCarouselItem);

    return { carousel };
  },
});
</script>

<style scoped lang="scss">
// .el-carousel__item h3 {
//   color: #475669;
//   font-size: 18px;
//   opacity: 0.75;
//   margin: 0;
// }

.gallery-container {
  margin-top: 30px;
  img {
    width: 100%;
    max-width: 100%;
  }
}

.carousel-container {
  color: black;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px 80px;
  max-height: 100%;

  .carousel-body {
    overflow: hidden;
  }

  h3 {
    margin-top: 0;
  }
  .carousel-content {
    font-size: 80%;
    font-style: italic;
    text-align: justify;
  }

  img {
    max-width: 100%;
    width: 100%;
    height: 320px;
    z-index: -1;
    max-height: 320px;
    position: absolute;
    left: 0;
    top: 0;
  }
  .carousel-button {
    z-index: 1;
    position: absolute;
    left: 20px;
    bottom: 40px;
    margin-top: 10px;
    margin-bottom: 40px;
    margin-left: 60px;
    border-radius: 30px;
    height: 40px;
    width: 150px;
    font-weight: 600;
    &:hover {
      cursor: pointer;
      background-color: black;
      color: white;
    }
  }
  .el-button:hover {
    background-color: black;
    color: white;
  }
}
:deep(.el-carousel__arrow) {
  background-color: white;
  color: black;

  &:hover {
    background-color: #9c9c9c;
  }
}
</style>
